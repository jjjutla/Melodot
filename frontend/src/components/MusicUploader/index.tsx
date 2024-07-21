import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
// import { Web3Storage } from "web3.storage";
// import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
// import PauseCircleFilledOutlinedIcon from "@mui/icons-material/PauseCircleFilledOutlined";

const MusicUploader = (props: any) => {
  const { fullTrackFile, setFileUrl, setDuration, setFullTrackFile } = props;
  const [, setIsPlaying] = useState<any>(false);
  const audioRef = useRef<any>(null);

  useEffect(() => {}, []);

  const onFilesUpload = async (e: any) => {
    const files = e.target.files;
    if (files.length === 0) {
      return;
    }
    setFullTrackFile(files[0]);
    const url = URL.createObjectURL(files[0]);
    setFileUrl(url);
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.addEventListener(
      "loadedmetadata",
      function () {
        // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
        var duration = audio.duration;

        setDuration(duration);
      },
      false
    );
    audioRef.current.addEventListener("play", function () {
      setIsPlaying(true);
    });
    audioRef.current.addEventListener("pause", function () {
      setIsPlaying(false);
    });
    audioRef.current.addEventListener("ended", function () {
      setIsPlaying(false);
    });
    // const reader = new FileReader();
    // reader.addEventListener("load", (event: any) => {
    //   console.log({ event });
    //   console.log(event.target.result);
    // });
    // reader.readAsArrayBuffer(files[0]);
    // try {
    //   const storage = new Web3Storage({
    //     token:
    //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI4MzlDRUJFMjdjQjhmQjI5ZEM3YjBlNUYxYUM0MTFBOTY4ZDY0YTUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTIxODMxMjUxNTgsIm5hbWUiOiJudXNpYy1tZXRhZGF0YS1sYXllciJ9.fabb15vVeiulzE83_9jDzFnl2vD-IIJ2OoX4qm4B6hs",
    //   });
    //   const _cid = await storage.put(files);
    //   // console.log("Content added with CID:", _cid);
    //   setCid(_cid);
    // } catch (err) {
    //   alert(err);
    // }
  };

  // const onPlayOrPause = () => {
  //   if (isPlaying) {
  //     audioRef.current.pause();
  //   } else {
  //     audioRef.current.play();
  //   }
  // };

  // const onUploadToStorage = async () => {
  //   try {
  //     const storage = new Web3Storage({
  //       token: process.env.WEB3_STORAGE as string,
  //     });
  //     const fileCid = await storage.put([file]);
  //     setCid(fileCid);
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  return (
    <Box>
      <Typography>Full Track Uploader</Typography>
      <Box pt={1}>
        <Button
          variant="outlined"
          component="label"
          onChange={onFilesUpload}
          disabled={!!fullTrackFile}
        >
          Upload
          <input type="file" hidden />
        </Button>
        {/* {!file ? (
          <Button variant="outlined" component="label" onChange={onFilesUpload}>
            Upload
            <input type="file" hidden />
          </Button>
        ) : (
          <IconButton onClick={onPlayOrPause}>
            {!isPlaying ? (
              <PlayCircleFilledWhiteOutlinedIcon
                color="primary"
                fontSize="large"
              />
            ) : (
              <PauseCircleFilledOutlinedIcon color="warning" fontSize="large" />
            )}
          </IconButton>
        )} */}
        {/* {file && (
          <Button variant="contained" onClick={onUploadToStorage}>
            Upload to Web3Storage
          </Button>
        )} */}
      </Box>
      {/* <Box pt={2}>
        <Typography>Uploaded CID: {cid}</Typography>
      </Box> */}
    </Box>
  );
};

export default MusicUploader;
