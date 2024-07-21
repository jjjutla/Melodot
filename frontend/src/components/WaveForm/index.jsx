/* eslint-disable react-hooks/exhaustive-deps */

import SpectrogramPlugin from "wavesurfer.js/dist/plugin/wavesurfer.spectrogram.min.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import MakersPlugin from "wavesurfer.js/dist/plugin/wavesurfer.markers.min.js";
import WaveSurfer from "wavesurfer.js";
import {
  Box,
  Button,
  Typography,
  Stack,
  Slider,
  Select,
  MenuItem,
  IconButton,
  Card,
  // TextField,
} from "@mui/material";
import colormap from "colormap";
import { useEffect, useRef, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SectionNames = [
  "Intro",
  "Verse",
  "Pre-Chorus",
  "Chorus",
  "Post-Chorus",
  "Breakdown",
  "Bridge",
  "Hook",
  "Outro",
];

const WaveForm = (props) => {
  const {
    url,
    durationOfEachBarInSec,
    noOfBars,
    startBeatOffsetMs,
    sectionsObj,
    setSectionsObj,
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const wavesurferIns = useRef(null);
  const [zoomValue, setZoomValue] = useState(1);
  const [bars, setBars] = useState({});

  useEffect(() => {
    if (noOfBars && durationOfEachBarInSec && wavesurferIns.current) {
      let start = startBeatOffsetMs / 1000;
      let end;
      const newBars = {};
      for (let i = 0; i < noOfBars; i++) {
        end = start + durationOfEachBarInSec;
        // const hue = (360 * i) / noOfBars
        // wavesurferIns.current.addRegion({
        //   start,
        //   end,
        //   color: `hsla(${hue}, 50%, 70%, 0.4)`,
        //   resize: false
        // });
        const no = i + 1;
        wavesurferIns.current.addMarker({
          time: start,
          color: "rgba(0,0,0,0.1)",
          position: "top",
          label: no,
        });
        newBars[no] = { start, end };
        start = end;
      }
      setBars(newBars);
    }
  }, [durationOfEachBarInSec, noOfBars, startBeatOffsetMs]);

  const showWaveForm = () => {
    const colors = colormap({
      colormap: "hot",
      nshades: 256,
      format: "float",
    });
    var wavesurfer = WaveSurfer.create({
      scrollParent: true,
      fillParent: false,
      // barGap: 50,
      container: "#waveform",
      backgroundColor: "white",
      waveColor: "#573FC8",
      cursorColor: "red",
      backend: "MediaElement",
      height: 200,
      // barHeight: 1.5,
      // barGap: 3,
      plugins: [
        TimelinePlugin.create({
          container: "#wave-timeline",
          primaryFontColor: "#fff",
          secondaryFontColor: "#fff",
        }),
        RegionsPlugin.create({
          // dragSelection: false,
          dragSelection: {
            slop: 5,
          },
        }),
        SpectrogramPlugin.create({
          container: "#wave-spectrogram",
          waveColor: "yellow",
          colorMap: colors,
        }),
        MakersPlugin.create(),
      ],
    });
    wavesurfer.on("ready", function () {
      setIsLoading(false);
      // wavesurfer.backend()
    });
    // wavesurfer.on("region-update-end", function () {
    //   // start, end, id,
    //   setSegments(Object.values(wavesurferIns.current.regions.list).map(region => ({internalId: region.id, start: region.start, end: region.end, })))
    //   // const updatedSegments = segments.map(segment => {
    //   //   if (segment.id === region.id) {
    //   //     return {}
    //   //   }
    //   //   return segment
    //   // })
    //   // setSegments()
    // })
    // wavesurfer.on("region-removed", function () {
    //   // start, end, id,
    //   setSegments(Object.values(wavesurferIns.current.regions.list).map(region => ({internalId: region.id, start: region.start, end: region.end, })))
    //   // const updatedSegments = segments.map(segment => {
    //   //   if (segment.id === region.id) {
    //   //     return {}
    //   //   }
    //   //   return segment
    //   // })
    //   // setSegments()
    // })
    wavesurfer.load(url);
    wavesurferIns.current = wavesurfer;
    wavesurferIns.current.on("region-created", function (region) {
      // const newSectionsObj = { ...sectionsObj };
      // const id = Object.keys(newSectionsObj).length;
      // region.id = id;
      // var o = Math.round,
      //   r = Math.random,
      //   s = 255;
      // const color =
      //   "rgba(" +
      //   o(r() * s) +
      //   "," +
      //   o(r() * s) +
      //   "," +
      //   o(r() * s) +
      //   "," +
      //   0.4 +
      //   ")";
      // region.id = id;
      // region.color = color;
      // newSectionsObj[id] = {
      //   name: SectionNames[id],
      //   start: region.start,
      //   end: region.end,
      // };
      // setSectionsObj(newSectionsObj);
    });
  };

  useEffect(() => {
    if (url) {
      showWaveForm();
    }
  }, [url]);

  useEffect(() => {
    if (wavesurferIns.current && !isLoading) {
      wavesurferIns.current.on("region-update-end", function (region) {
        const id = region.id;
        const newSectionsObj = { ...sectionsObj };
        if (newSectionsObj[id]) {
          // newSectionsObj[id].start = region.start;
          const differenceToClosestBarEnd = Object.values(bars).filter(
            (bar) => region.end >= bar.start && region.end < bar.end
          );
          const barsInSection =
            Object.keys(bars).filter(
              (barNo) =>
                bars[barNo].start >= region.start &&
                bars[barNo].end <= region.end
            ).length + 1;
          newSectionsObj[id].bars = barsInSection;
          if (differenceToClosestBarEnd.length) {
            const newEnd = differenceToClosestBarEnd[0].end;
            newSectionsObj[id].end = newEnd;
            region.onResize(newEnd - region.end);
          } else {
            newSectionsObj[id].end = region.end;
            setSectionsObj(newSectionsObj);
          }
          // if (
          //   id &&
          //   region.start !== wavesurferIns.current.regions.list[id - 1].end
          // ) {
          //   region.onResize(
          //     wavesurferIns.current.regions.list[id - 1].end,
          //     "start"
          //   );
          // }
        }
        // else {
        //   newSectionsObj[id] = {
        //     name: SectionNames[id],
        //     start: region.start,
        //     end: region.end,
        //   };
        //   setSectionsObj(newSectionsObj);
        // }
      });
    }
  }, [isLoading, sectionsObj]);

  const addSection = () => {
    const newSectionsObj = { ...sectionsObj };
    const id = Object.keys(newSectionsObj).length;
    if (id === 0) {
      newSectionsObj[id] = {
        id,
        name: SectionNames[id],
        start: 0,
        end: durationOfEachBarInSec,
        bars: 1,
      };
    } else {
      const prevRegion = wavesurferIns.current.regions.list[id - 1];
      newSectionsObj[id] = {
        id,
        name: SectionNames[id],
        start: prevRegion.end,
        end: prevRegion.end + durationOfEachBarInSec,
        bars: 1,
      };
    }
    var o = Math.round,
      r = Math.random,
      s = 255;
    const color =
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      0.4 +
      ")";
    wavesurferIns.current.addRegion({
      id,
      start: newSectionsObj[id].start,
      end: newSectionsObj[id].end,
      color,
    });
    setSectionsObj(newSectionsObj);
  };
  const pauseOrPlay = () => {
    wavesurferIns.current.playPause();
  };

  const onZoom = (e) => {
    setZoomValue(Number(e.target.value));
    wavesurferIns.current.zoom(Number(e.target.value));
  };

  return (
    <Box mt={5}>
      <Typography variant="h6">Waveform Explorer</Typography>
      <Box mt={4}>
        {!isLoading && (
          <Button variant="contained" onClick={pauseOrPlay}>
            Play/Pause
          </Button>
        )}
      </Box>
      <Box mt={4}>
        <Box id="waveform" style={{ width: "100%" }}></Box>
        <Box id="wave-timeline"></Box>
      </Box>
      <Box display="flex" justifyContent="end">
        {url && (
          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1 }}
            alignItems="center"
            width={300}
          >
            <RemoveIcon color="primary" />
            <Slider
              aria-label="Volume"
              value={zoomValue}
              onChange={onZoom}
              step={10}
              min={1}
              max={100}
            />
            <AddIcon color="primary" />
          </Stack>
        )}
      </Box>
      <Accordion mt={4} width="100%" color="primary">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Audio Fingerprint</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box mt={2} id="wave-spectrogram" width="100%"></Box>
        </AccordionDetails>
      </Accordion>
      {/* <Box mt={4} width="100%">
        <Typography variant="h6">Audio Fingerprint</Typography>
        <Box mt={2} id="wave-spectrogram" width="100%"></Box>
      </Box> */}
      <Box mt={2}>
        <Typography variant="h6">Sections Information</Typography>
        <Box mt={2}>
          <Box>
            <Button onClick={addSection} variant="contained">
              Add Section
            </Button>
            {/* <Typography>No of Sections</Typography>
            <TextField
              type="number"
              onChange={(e) => {
                // const noOfSections = parseInt(e.target.value);
                // if (noOfSections > sectionsObj.length) {
                //   const newNoSections = noOfSections - sectionsObj.length;
                //   const newSections = [...sectionsObj];
                //   for (let i = 0; i < newNoSections; i++) {
                //     newSections.push({
                //       internalId: newSections + i,
                //       name: SectionNames[i] || "",
                //       start: 0,
                //       end: 0,
                //     });
                //   }
                //   setSectionsObj(newSections);
                // }
              }}
            /> */}
          </Box>
        </Box>
        <Box display="flex" gap={3} flexWrap="wrap" mt={2}>
          {Object.values(sectionsObj).map((section, i) => (
            <Card>
              <Box p={2}>
                <Box mb={1}>
                  <Typography>Section Name</Typography>
                  <Select
                    size="small"
                    value={section.name}
                    onChange={(e) => {
                      const newSectionsObj = { ...sectionsObj };
                      const id = Object.keys(newSectionsObj).filter(
                        (key) => key === section.id.toString()
                      )[0];
                      newSectionsObj[id].name = e.target.value;
                      setSectionsObj(newSectionsObj);
                    }}
                  >
                    <MenuItem value={"Intro"}>Intro</MenuItem>
                    <MenuItem value={"Verse"}>Verse</MenuItem>
                    <MenuItem value={"Pre-Chorus"}>Pre-Chorus</MenuItem>
                    <MenuItem value={"Chorus"}>Chorus</MenuItem>
                    <MenuItem value={"Post-Chorus"}>Post-Chorus</MenuItem>
                    <MenuItem value={"Breakdown"}>Breakdown</MenuItem>
                    <MenuItem value={"Bridge"}>Bridge</MenuItem>
                    <MenuItem value={"Hook"}>Hook</MenuItem>
                    <MenuItem value={"Outro"}>Outro</MenuItem>
                  </Select>
                </Box>
                {/* <Box>
                  <Typography>Measures</Typography>
                  <TextField
                    size="small"
                    style={{ width: "100px" }}
                    onChange={(e) => {
                      // const [startBar, endBar] = e.target.value.split(",");
                      // if (parseInt(startBar) && parseInt(endBar)) {
                      //   const newSections = [...sectionsObj];
                      //   const idx = newSections.findIndex(
                      //     (sec) => sec.internalId === section.internalId
                      //   );
                      //   newSections[idx].start = bars[startBar].start;
                      //   newSections[idx].end = bars[endBar].end;
                      //   var o = Math.round,
                      //     r = Math.random,
                      //     s = 255;
                      //   const color =
                      //     "rgba(" +
                      //     o(r() * s) +
                      //     "," +
                      //     o(r() * s) +
                      //     "," +
                      //     o(r() * s) +
                      //     "," +
                      //     0.4 +
                      //     ")";
                      //   if (wavesurferIns.current.regions.list[i]) {
                      //     wavesurferIns.current.regions.list[i].onResize(
                      //       bars[startBar].start,
                      //       "start"
                      //     );
                      //     wavesurferIns.current.regions.list[i].onResize(
                      //       bars[startBar].start,
                      //       "end"
                      //     );
                      //   } else {
                      //     newSections[idx].color = color;
                      //     wavesurferIns.current.addRegion({
                      //       start: bars[startBar].start,
                      //       end: bars[endBar].end,
                      //       color: newSections[idx].color,
                      //       resize: false,
                      //       drag: false,
                      //       id: i,
                      //     });
                      //   }
                      //   setSectionsObj(newSections);
                      // }
                    }}
                  ></TextField>
                </Box> */}
                {section.end > 0 && (
                  <Box mt={2}>
                    <Typography>Start: {section.start.toFixed(2)}s</Typography>
                    <Typography>End: {section.end.toFixed(2)}s</Typography>
                    <Box>
                      <IconButton
                        onClick={() => {
                          wavesurferIns.current.regions.list[i].play();
                        }}
                      >
                        <PlayCircleFilledWhiteOutlinedIcon />
                      </IconButton>
                      {/* <IconButton
                        onClick={() => {
                          wavesurferIns.current.regions.list[i].remove();
                        }}
                      >
                        <ClearIcon />
                      </IconButton> */}
                    </Box>
                  </Box>
                )}
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default WaveForm;
