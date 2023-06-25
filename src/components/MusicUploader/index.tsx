import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
const MusicUploader = (props: any) => {
  const { fullTrackFile, setFileUrl, setDuration, setFullTrackFile } = props;
  const [, setIsPlaying] = useState<any>(false);
  const audioRef = useRef<any>(null);

  useEffect(() => { }, []);

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

  };

  return (
    <Box>
      <Typography>Full Track Uploader</Typography>
      <Box pt={1}>
        <Button
          variant="outlined"
          component="label"
          onChange={onFilesUpload}
          disabled={!!fullTrackFile}
          style={{ backgroundColor: 'white', color: 'black', border: 'none' }}
        >
          Upload
          <input type="file" hidden />
        </Button>
      </Box>
    </Box>

  );
};

export default MusicUploader;
