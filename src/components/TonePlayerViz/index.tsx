import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import * as Tone from "tone";
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
    return rmsesVal;
  };

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
            context.fillStyle = colors[index];
          }
          const y = height / 2 - barHeight / 2;
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(x - 3, y + barHeight / 2);
          context.lineTo(x, y + barHeight);
          context.lineTo(x + 3, y + barHeight / 2);
          context.closePath();
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
  }, []);
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
