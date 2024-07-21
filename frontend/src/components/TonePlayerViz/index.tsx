import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import * as Tone from "tone";
import { Section, SectionInfo, sectionsWithOffset } from "../../MarketPlace";
import CanvasSectionBox from "../CanvasSectionBox";
import TransportBar from "../TransportBar";

const scaleValue = (
  v: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => {
  return ((v - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
};

export const colors = [
  "#221AE1",
  "#B52FD8",
  "#7074DE",
  "#5425CC",
  "#8927E2",
  "#221AE1",
  "#B52FD8",
  "#7074DE",
  "#5425CC",
  "#8927E2",
  "#221AE1",
  "#B52FD8",
  "#7074DE",
  "#5425CC",
  "#8927E2",
  "#221AE1",
  "#B52FD8",
  "#7074DE",
  "#5425CC",
  "#8927E2",
];

const TonePlayerViz = (props: {
  onMounted: (width: number) => void;
  tonePlayer: Tone.Player;
  name: string;
  sectionLocation: SectionInfo;
  onPlayOrPause: () => void;
  toggleSongOrStemMode: () => void;
  isSongModeState: boolean;
  selectedStemPlayerName: string;
  isPlaying: boolean;
  isLoopOn: boolean;
  transportProgress: number;
  onMintNft: (price: number, sectionIndex: number) => Promise<void>;
  selectedTrackIndex?: number;
}) => {
  const {
    onMounted,
    tonePlayer,
    name,
    sectionLocation,
    onPlayOrPause,
    toggleSongOrStemMode,
    isSongModeState,
    selectedStemPlayerName,
    isPlaying,
    isLoopOn,
    transportProgress,
    onMintNft,
    selectedTrackIndex,
  } = props;
  const audioWaveformCanvas = useRef<HTMLCanvasElement>(null);

  const computeRMS = (
    buffer: Tone.ToneAudioBuffer,
    width: number
  ): number[] => {
    // if (this._waveform && this._waveform.length === width) {
    //   return;
    // }
    const array = buffer.toArray(0) as Float32Array;
    const length = 64;
    const rmses = [];
    for (let i = 0; i < width; i++) {
      const offsetStart = Math.floor(
        scaleValue(i, 0, width, 0, array.length - length)
      );
      const offsetEnd = offsetStart + length;
      let sum = 0;
      for (let s = offsetStart; s < offsetEnd; s++) {
        sum += Math.pow(array[s], 2);
      }
      const rms = Math.sqrt(sum / length);
      rmses[i] = rms;
    }
    const max = Math.max(...rmses);
    const rmsesVal = rmses.map((v) =>
      scaleValue(Math.pow(v, 0.8), 0, max, 0, 1)
    );
    // let arr1 = [];
    // let temp: number[] = [];
    // rmses.map((rms, i) => {
    //   if (i % 7 === 0 && i !== 0) {
    //     console.log(temp.length);
    //     const sum = temp.reduce((a, b) => a + b, 0);
    //     arr1.push(sum / 7);
    //     temp = [];
    //   } else {
    //     temp.push(rms);
    //   }
    // });
    // const bu = Math.round(buffer.sampleRate * 1);
    // return filterData(rmsesVal, buffer.duration);
    return rmsesVal;
  };

  // const filterData = (audioBuffer: number[], duration: number) => {
  //   // const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
  //   const samples = duration; // Number of samples we want to have in our final data set
  //   const blockSize = Math.floor(audioBuffer.length / samples); // the number of samples in each subdivision
  //   const filteredData = [];
  //   for (let i = 0; i < samples; i++) {
  //     let blockStart = blockSize * i; // the location of the first sample in the block
  //     let sum = 0;
  //     for (let j = 0; j < blockSize; j++) {
  //       sum = sum + Math.abs(audioBuffer[blockStart + j]); // find the sum of all the samples in the block
  //     }
  //     filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
  //   }
  //   return filteredData;
  // };

  const visualize = (tone: Tone.Player) => {
    if (tone.loaded) {
      const buffer = tone.buffer;
      const canvas = audioWaveformCanvas.current as HTMLCanvasElement;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const { width, height } = canvas;
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      context.clearRect(0, 0, width, height);
      const waveform = computeRMS(buffer, width);
      context.fillStyle = "white";
      waveform?.map((val: number, i: number) => {
        if (i % 6 === 0) {
          const barHeight = val * height;
          const x = tone.reverse ? width - i : i;
          const offsetStart = scaleValue(
            i,
            0,
            waveform?.length ?? 0,
            0,
            buffer.duration
          );
          const index = (
            sectionsWithOffset[selectedTrackIndex as 0 | 1] as Section[]
          ).findIndex(
            ({ sectionStartBeatInSeconds, sectionEndBeatInSeconds }) =>
              sectionStartBeatInSeconds < offsetStart &&
              sectionEndBeatInSeconds > offsetStart
          );
          const section = (
            sectionsWithOffset[selectedTrackIndex as 0 | 1] as Section[]
          )[index];
          if (!section) {
            context.fillStyle = "#553B96";
          } else {
            // const hue =
            //   (section.sectionStartBeatInSeconds / buffer.duration) * 360;
            context.fillStyle = colors[index];
          }
          const y = height / 2 - barHeight / 2;
          // TODO:
          // context.fillRect(x, y, 5, barHeight);
          // context.fill();
          context.beginPath();
          context.moveTo(x, y);
          // top left edge
          context.lineTo(x - 3, y + barHeight / 2);

          // bottom left edge
          context.lineTo(x, y + barHeight);

          // bottom right edge
          context.lineTo(x + 3, y + barHeight / 2);

          // closing the path automatically creates
          // the top right edge
          context.closePath();
          // context.translate(6.5, 0);
          // context.fillStyle = "red";
          context.fill();
        }
        return "";
      });
    }
  };

  useEffect(() => {
    if (tonePlayer) {
      visualize(tonePlayer);
      onMounted(audioWaveformCanvas.current?.clientWidth ?? 1);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (!tonePlayer) {
    return <Box></Box>;
  }
  return (
    <Box position={"relative"} width="100%" height="100%">
      <canvas
        style={{ width: "100%", height: "100%" }}
        ref={audioWaveformCanvas}
        data-player={name}
      />

      {isSongModeState === false && selectedStemPlayerName === name && (
        <TransportBar transportProgress={transportProgress} />
      )}
      {isSongModeState === false && selectedStemPlayerName === name && (
        <CanvasSectionBox
          sectionLocation={sectionLocation}
          onPlayOrPause={onPlayOrPause}
          toggleSongOrStemMode={toggleSongOrStemMode}
          isPlaying={isPlaying}
          isLoopOn={isLoopOn}
          isSongModeState={isSongModeState}
          onMintNft={onMintNft}
          selectedTrackIndex={selectedTrackIndex}
          selectedStemPlayerName={selectedStemPlayerName}
        ></CanvasSectionBox>
      )}
    </Box>
  );
};

export default TonePlayerViz;
