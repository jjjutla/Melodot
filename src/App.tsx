import bgImage from './bg.png';

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MusicUploader from "./components/MusicUploader";
import WaveForm from "./components/WaveForm";
import CachedIcon from "@mui/icons-material/Cached";
import AcceptStems from "./components/Dropzone";
import { useDropzone } from "react-dropzone";
import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import TransactionDialog from "./components/TransactionDialog";
import { Web3Storage } from "web3.storage";
import { useNavigate } from "react-router-dom";

const CryptoJS = require("crypto-js");

const StemTypes = ["Vocal", "Instrumental", "Bass", "Drums"];
const musicKeys = [
  { key: "C major", id: "CMa" },
  { key: "D♭ major", id: "DflMa" },
  { key: "D major", id: "DMa" },
  { key: "E♭ major", id: "EflMa" },
  { key: "E major", id: "EMa" },
  { key: "F major", id: "FMa" },
  { key: "F# major", id: "FshMa" },
  { key: "G major", id: "GMa" },
  { key: "A♭ major", id: "AflMa" },
  { key: "A major", id: "AMa" },
  { key: "B♭ major", id: "BflMa" },
  { key: "B major", id: "BMa" },
  { key: "C minor", id: "CMi" },
  { key: "C# minor", id: "CshMi" },
  { key: "D minor", id: "DMi" },
  { key: "E♭ minor", id: "EflMi" },
  { key: "E minor", id: "EMi" },
  { key: "F minor", id: "FMi" },
  { key: "F# minor", id: "FshMi" },
  { key: "G minor", id: "GMi" },
  { key: "G# minor", id: "GshMi" },
  { key: "A minor", id: "AMi" },
  { key: "A♭ minor", id: "AflMi" },
  { key: "B♭ minor", id: "BflMi" },
  { key: "B minor", id: "BMi" },
];

type Stem = { file: File; name: string; type: string };
type StemsObj = {
  [key: string]: Stem;
};
type Section = { name: string; start: number; end: number; bars: number };
type SectionsObj = {
  [internalId: string]: Section;
};
const getWithoutSpace = (str: string) => str.split(" ").join("");
function App() {
  const [fullTrackFile, setFullTrackFile] = useState<File>();
  const [cid, setCid] = useState<string>();
  const [artist, setArtist] = useState<string>();
  const [duration, setDuration] = useState<number>();
  const [title, setTitle] = useState<string>();
  const [album, setAlbum] = useState<string>();
  const [genre, setGenre] = useState<string>();
  const [bpm, setBpm] = useState<number>();
  const [key, setKey] = useState<string>();
  const [timeSignature, setTimeSignature] = useState<string>();
  const [noOfBeatsPerBar, setNoOfBeatsPerBar] = useState<number>(0);
  const [noOfBars, setNoOfBars] = useState<number>();
  const [noOfBeats, setNoOfBeats] = useState<number>();
  const [fileUrl, setFileUrl] = useState<string>();
  const [startBeatOffsetMs, setStartBeatOffsetMs] = useState<number>(0);
  const [durationOfEachBarInSec, setDurationOfEachBarInSec] =
    useState<number>();
  const [sectionsObj, setSectionsObj] = useState<SectionsObj>({});
  const [stemsObj, setStemsObj] = useState<StemsObj>({});

  const getSelectedBeatOffet = useRef(null);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [activeTxStep, setActiveTxStep] = useState<number>(0);
  const [isTxDialogOpen, setIsTxDialogOpen] = useState<boolean>(false);
  const [isEncryptFiles, setIsEncryptFiles] = useState<boolean>(false);

  const [fullTrackHash, setFullTrackHash] = useState<string>();
  const [stemsHash, setStemsHash] = useState<string[]>([]);
  const [sectionsHash, setSectionsHash] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (acceptedFiles.length) {
      const obj = {} as StemsObj;
      acceptedFiles.map((acceptedFile, i) => {
        obj[i] = {
          file: acceptedFile,
          name: acceptedFile.name,
          type: StemTypes[i] || "",
        };
        return "";
      });
      setStemsObj(obj);
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (duration && bpm && timeSignature?.includes("/4")) {
      const beatsPerSecond = bpm / 60;
      const totalNoOfBeats =
        beatsPerSecond * (duration - startBeatOffsetMs / 1000);
      setNoOfBeats(totalNoOfBeats);
      const noOfBeatsPerBar = parseFloat(timeSignature.split("/")[0]);
      setNoOfBeatsPerBar(noOfBeatsPerBar);
      const noOfMeasures = Math.floor(totalNoOfBeats / noOfBeatsPerBar);
      setNoOfBars(noOfMeasures);
      const durationOfEachBar = duration / noOfMeasures;
      setDurationOfEachBarInSec(durationOfEachBar);
    }
  }, [duration, bpm, timeSignature, startBeatOffsetMs]);

  const onFetchStartBeatOffet = async () => {
    if (fileUrl) {
      const time = document.getElementsByTagName("audio")[0]?.currentTime;
      setStartBeatOffsetMs(Math.floor(time * 1000));
    }
  };
  const download = (content: any, fileName: string, contentType: string) => {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  };
  const onTx = async () => {
    let wsProvider;
    let api: ApiPromise;
    try {

      wsProvider = new WsProvider("ws://127.0.0.1:9944");

      api = await ApiPromise.create({
        provider: wsProvider,
        throwOnConnect: true,
      });
    } catch (e) {
      setFullTrackHash("error");
      setActiveTxStep(4);
      return;
    }
    const keyring = new Keyring({ type: "sr25519" });
    const account = keyring.addFromUri("//Alice", { name: "Alice default" });

    const titleWithoutSpace = getWithoutSpace(title as string).slice(0, 10);
    const genreWithoutSpace = getWithoutSpace(genre as string);
    const fullTrackContent = {
      id: `fulltrack${titleWithoutSpace}${genreWithoutSpace}${key}${bpm}`,
      cid,
      artist,
      title,
      album,
      genre,
      bpm,
      key,
      timeSignature,
      noOfBars,
      noOfBeats,
      duration,
      startBeatOffsetMs: startBeatOffsetMs.toString(),
      sections: Object.keys(sectionsObj).length,
      stems: Object.keys(stemsObj).length,
    };
    try {
      const fullTrackTxHash = await new Promise<string>((res) => {
        api.tx.templateModule
          .createFulltrack(
            `fulltrack${titleWithoutSpace}${genreWithoutSpace}${key}${bpm}`,
            cid,
            artist?.slice(0, 128),
            title?.slice(0, 128),
            album?.slice(0, 128),
            genre,
            bpm,
            key,
            timeSignature,
            noOfBars,
            noOfBeats,
            duration,
            startBeatOffsetMs.toString(),
            Object.keys(sectionsObj).length,
            Object.keys(stemsObj).length
          )
          .signAndSend(account, ({ events = [], status }) => {
            if (status.isFinalized) {
              console.log(
                `Transaction included at blockHash ${status.asFinalized}`
              );

              events.forEach(({ phase, event: { data, method, section } }) => {
                console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
              });
              res(status.hash.toString());
            }
          });
      });
      setFullTrackHash(fullTrackTxHash);
    } catch (e) {
      alert(e);
    }
    setActiveTxStep(2);
    const stems = Object.values(stemsObj);
    const stemsContent = [];
    for (let i = 0; i < stems.length; i++) {
      const stemObj = stems[i];
      stemsContent.push({
        id: `stem${i + 1}${titleWithoutSpace}${genreWithoutSpace}${key}${bpm}`,
        cid,
        name: stemObj.name,
        type: stemObj.type,
      });
      const stemHash = await new Promise<string>((res) => {
        api.tx.templateModule
          .createStem(
            `stem${i + 1}${titleWithoutSpace}${genreWithoutSpace}${key}${bpm}`,
            cid,
            stemObj.name,
            stemObj.type
          )
          .signAndSend(account, ({ events = [], status }) => {
            if (status.isFinalized) {
              console.log(
                `Transaction included at blockHash ${status.asFinalized}`
              );

              events.forEach(({ phase, event: { data, method, section } }) => {
                console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
              });
              res(status.hash.toString());
            }
          });
      });
      setStemsHash([...stemsHash, stemHash]);
    }
    setActiveTxStep(3);

    const sections = Object.values(sectionsObj);
    const sectionsContent = [];
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      sectionsContent.push({
        id: `section${i + 1
          }${titleWithoutSpace}${genreWithoutSpace}${key}${bpm}`,
        name: section.name,
        startMs: section.start * 1000,
        endMs: section.end * 1000,
        bars: section.bars,
        beats: section.bars * noOfBeatsPerBar,
      });
      const sectionHash = await new Promise<string>((res) => {
        api.tx.templateModule
          .createSection(
            `section${i + 1
            }${titleWithoutSpace}${genreWithoutSpace}${key}${bpm}`,
            section.name,
            section.start * 1000,
            section.end * 1000,
            section.bars,
            section.bars * noOfBeatsPerBar
          )
          .signAndSend(account, ({ events = [], status }) => {
            if (status.isFinalized) {
              console.log(
                `Transaction included at blockHash ${status.asFinalized}`
              );


              events.forEach(({ phase, event: { data, method, section } }) => {
                console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
              });
              res(status.hash.toString());
            }
          });
      });
      setSectionsHash([...sectionsHash, sectionHash]);
    }
    download(
      JSON.stringify({ fullTrackContent, stemsContent, sectionsContent }),
      "EasyAHackData.json",
      "text/plain"
    );
    setActiveTxStep(4);
  };


  const onTxClick = async () => {
    if (!fullTrackFile) {
      alert("Upload Full Track.");
      return;
    } else if (acceptedFiles.length === 0) {

    }
    setIsTxDialogOpen(true);
    const stemFiles: File[] = Object.values(stemsObj).map((obj) => obj.file);
    const allFiles = [fullTrackFile, ...stemFiles];
    let finalFiles;
    if (isEncryptFiles) {
      finalFiles = await encryptFiles(allFiles);
    } else {
      finalFiles = allFiles;
    }
    const client = new Web3Storage({
      token: process.env.REACT_APP_WEB3_STORAGE as string,
    });
    const cid = await client.put(finalFiles);
    setCid(cid);

    setActiveTxStep(1);
  };
  useEffect(() => {
    if (cid) {
      onTx();
    }

  }, [cid]);

  const encryptFiles = async (files: File[]): Promise<File[]> => {
    const filePromises = files.map((file) => {
      return new Promise<File>((res) => {
        const reader = new FileReader();
        reader.addEventListener("load", (event: any) => {
          const buff = event.target.result;
          var wordArray = CryptoJS.lib.WordArray.create(buff);
          var encrypted = CryptoJS.AES.encrypt(
            wordArray,
            process.env.REACT_APP_ENCRYPTION_KEY
          ).toString();
          const newEncryptedFile = new File([encrypted], file.name);
          res(newEncryptedFile);
        });
        reader.readAsArrayBuffer(file);
      });
    });
    return Promise.all(filePromises);

  };
  const onTxDialogClose = () => {
    setIsTxDialogOpen(false);
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `url(${bgImage}) no-repeat center center fixed`,
        backgroundSize: 'cover'
      }}
    >
      <Box p={{ xs: 4, md: 10 }}>
        <Typography variant="h4" fontWeight="800" align="center">
          Melodot Artist Uploader
        </Typography>
        <Grid container mt={8} gap={{ xs: 2 }}>
          <Grid item xs={12} md={7}>
            <Grid container gap={2}>
              <Grid item xs={10} md={4}>
                <Box display="flex" justifyContent="start">
                  <Box>
                    <Typography>Artist</Typography>
                    <TextField
                      variant="outlined"
                      onChange={(e: any) => setArtist(e.target.value)}
                    ></TextField>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={10} md={4}>
                <Box display="flex" justifyContent="start">
                  <Box>
                    <Typography>Track Title</Typography>
                    <TextField
                      variant="outlined"
                      onChange={(e: any) => setTitle(e.target.value)}
                    ></TextField>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={10} md={4}>
                <Box>
                  <Typography>Album Name</Typography>
                  <TextField
                    variant="outlined"
                    onChange={(e: any) => setAlbum(e.target.value)}
                  ></TextField>
                </Box>
              </Grid>
              <Grid item xs={10} md={4}>
                <Box>
                  <Typography>Genre</Typography>
                  <TextField
                    variant="outlined"
                    onChange={(e: any) => setGenre(e.target.value)}
                  ></TextField>
                </Box>
              </Grid>
              <Grid item xs={10} md={4}>
                <Box>
                  <Typography>Key</Typography>
                  <Select
                    variant="outlined"
                    onChange={(e: any) => setKey(e.target.value)}
                  >
                    {musicKeys.map(({ key, id }) => {
                      return (
                        <MenuItem value={id}>{key.toUpperCase()}</MenuItem>
                      );
                    })}
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={10} md={4}>
                <Box>
                  <MusicUploader
                    fullTrackFile={fullTrackFile}
                    setFullTrackFile={setFullTrackFile}
                    setFileUrl={setFileUrl}
                    setDuration={setDuration}
                  />
                </Box>
              </Grid>
              <Grid item xs={10} md={4}>
                <Box>
                  <Typography>Duration</Typography>
                  <TextField
                    variant="outlined"
                    value={duration}
                    disabled
                    placeholder="Fetched from upload"
                  ></TextField>
                </Box>
              </Grid>
              <Grid item xs={10} md={4}>
                <Box>
                  <Typography>Start Beat</Typography>
                  <OutlinedInput
                    value={startBeatOffsetMs}
                    onChange={(e) =>
                      setStartBeatOffsetMs(parseInt(e.target.value))
                    }
                    type="number"
                    placeholder="Waveform Selection"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={onFetchStartBeatOffet} edge="end">
                          <CachedIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={10} md={4}>
                <Box>
                  <Typography>Bpm</Typography>
                  <TextField
                    variant="outlined"
                    type={"number"}
                    onChange={(e: any) => setBpm(parseInt(e.target.value))}
                  ></TextField>
                </Box>
              </Grid>
              <Grid item xs={10} md={4}>
                <Box>
                  <Typography>Time Signature</Typography>
                  <TextField
                    variant="outlined"
                    onChange={(e: any) => setTimeSignature(e.target.value)}
                  ></TextField>
                </Box>
              </Grid>
              <Grid item xs={10} md={4}>
                <Box>
                  <Typography>No Of Measures</Typography>
                  <TextField
                    variant="outlined"
                    type="number"
                    value={noOfBars}
                    disabled
                  ></TextField>
                </Box>
              </Grid>
              <Grid item xs={10} md={4}>
                <Box>
                  <Typography>Encrypt Assets</Typography>
                  <Checkbox
                    value={isEncryptFiles}
                    onChange={(e) => setIsEncryptFiles(e.target.checked)}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Box
                style={{
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "30px",
                }}
                p={1}
              >
                <Typography
                  variant="h5"
                  p={1}
                  color={"black"}
                  textAlign="center"
                >
                  Metadata Information
                </Typography>
                <Grid container>
                  <Grid item xs={12}>
                    <Box p={1} display="flex" alignItems={"center"}>
                      <Box flexBasis={{ xs: "45%", md: "20%" }}>
                        <Typography fontWeight="bold" color="black">
                          Artist:
                        </Typography>
                      </Box>
                      <Box>
                        <Typography color="black">{artist}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box p={1} display="flex" alignItems={"center"}>
                      <Box flexBasis={{ xs: "45%", md: "20%" }}>
                        <Typography fontWeight="bold" color="black">
                          Track Title:
                        </Typography>
                      </Box>
                      <Box>
                        <Typography color="black">{title}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box p={1} display="flex" alignItems={"center"}>
                      <Box flexBasis={{ xs: "45%", md: "20%" }}>
                        <Typography fontWeight="bold" color="black">
                          Album:
                        </Typography>
                      </Box>
                      <Box>
                        <Typography color="black">{album}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box p={1} display="flex" alignItems={"center"}>
                      <Box flexBasis={{ xs: "45%", md: "20%" }}>
                        <Typography fontWeight="bold" color="black">
                          Genre:
                        </Typography>
                      </Box>
                      <Box>
                        <Typography color="black">{genre}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box p={1} display="flex" alignItems={"center"}>
                      <Box flexBasis={{ xs: "45%", md: "20%" }}>
                        <Typography fontWeight="bold" color="black">
                          Bpm:
                        </Typography>
                      </Box>
                      <Box>
                        <Typography color="black">{bpm}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box p={1} display="flex" alignItems={"center"}>
                      <Box flexBasis={{ xs: "45%", md: "20%" }}>
                        <Typography fontWeight="bold" color="black">
                          Key:
                        </Typography>
                      </Box>
                      <Box>
                        <Typography color="black">{key}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box p={1} display="flex" alignItems={"center"}>
                      <Box flexBasis={{ xs: "45%", md: "20%" }}>
                        <Typography fontWeight="bold" color="black">
                          Time Signature:
                        </Typography>
                      </Box>
                      <Box>
                        <Typography color="black">{timeSignature}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box p={1} display="flex" alignItems={"center"}>
                      <Box flexBasis={{ xs: "45%", md: "20%" }}>
                        <Typography fontWeight="bold" color="black">
                          No Of Measures:
                        </Typography>
                      </Box>
                      <Box>
                        <Typography color="black">{noOfBars}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box p={1} display="flex" alignItems={"center"}>
                      <Box flexBasis={{ xs: "45%", md: "20%" }}>
                        <Typography fontWeight="bold" color="black">
                          Duration:
                        </Typography>
                      </Box>
                      <Box>
                        <Typography color="black">{duration}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box p={1} display="flex" alignItems={"center"}>
                      <Box flexBasis={{ xs: "45%", md: "20%" }}>
                        <Typography fontWeight="bold" color="black">
                          Start Beat Offset:
                        </Typography>
                      </Box>
                      <Box>
                        <Typography color="black">
                          {startBeatOffsetMs}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box p={1} display="flex" alignItems={"center"}>
                      <Box flexBasis={{ xs: "45%", md: "20%" }}>
                        <Typography fontWeight="bold" color="black">
                          Music Cid:
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          color="black"
                          overflow={"hidden"}
                          textOverflow={"ellipsis"}
                          whiteSpace="nowrap"
                        >
                          {cid}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <WaveForm
          url={fileUrl}
          durationOfEachBarInSec={durationOfEachBarInSec}
          noOfBars={noOfBars}
          startBeatOffsetMs={startBeatOffsetMs}
          getSelectedBeatOffet={getSelectedBeatOffet}
          sectionsObj={sectionsObj}
          setSectionsObj={setSectionsObj}
        />
        <Box mt={8}>
          <Typography variant="h6">Proof of Creation</Typography>
          <Box mt={4} display="flex" justifyContent="center">
            <AcceptStems
              getRootProps={getRootProps}
              getInputProps={getInputProps}
            />
          </Box>
          <Box
            mt={4}
            display="flex"
            gap={2}
            justifyContent="center"
            flexWrap="wrap"
          >
            {Object.values(stemsObj).map(({ file, name, type }, i) => (
              <Box>
                <Box display="flex" justifyContent="center">
                  <Select
                    size="small"
                    value={type}
                    onChange={(e) => {
                      const newObject = { ...stemsObj };
                      newObject[i].type = String(e.target.value);
                      setStemsObj(newObject);
                    }}
                  >
                    <MenuItem value={"Vocal"}>Vocal</MenuItem>
                    <MenuItem value={"Instrumental"}>Instrumental</MenuItem>
                    <MenuItem value={"Bass"}>Bass</MenuItem>
                    <MenuItem value={"Drums"}>Drums</MenuItem>
                  </Select>
                </Box>
                <Box mt={2}>
                  <TextField
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      const newObject = { ...stemsObj };
                      newObject[i].name = e.target.value;
                      setStemsObj(newObject);
                    }}
                  ></TextField>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box mt={8} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" onClick={onTxClick}>
            Send To Blockchain
          </Button>
        </Box>
      </Box>
      <TransactionDialog
        isTxDialogOpen={isTxDialogOpen}
        activeTxStep={activeTxStep}
        onTxDialogClose={onTxDialogClose}
        fullTrackHash={fullTrackHash}
        stemsHash={stemsHash}
        sectionsHash={sectionsHash}
        isEncryptFiles={isEncryptFiles}
      />
    </Box>
  );
}

export default App;
