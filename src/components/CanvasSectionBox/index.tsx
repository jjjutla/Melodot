import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
  Popover,
  // TextField,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import LoopIcon from "@mui/icons-material/Loop";
import PauseIcon from "@mui/icons-material/Pause";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import ShopIcon from "@mui/icons-material/Shop";
import { useState } from "react";

const getStemIndex = (name: string) =>
  ["bass", "sound", "drums", "synth"].indexOf(name);

const CanvasSectionBox = (props: {
  sectionLocation: SectionInfo;
  onPlayOrPause: () => void;
  toggleSongOrStemMode: () => void;
  isPlaying: boolean;
  isLoopOn: boolean;
  isSongModeState: boolean;
  onMintNft: (price: number, sectionIndex: number) => Promise<void>;
  selectedTrackIndex?: number;
  selectedStemPlayerName: string;
}) => {
  const {
    sectionLocation: { left, width, index },
    onPlayOrPause,
    toggleSongOrStemMode,
    isPlaying,
    // isLoopOn,
    isSongModeState,
    onMintNft,
    selectedTrackIndex,
    selectedStemPlayerName,
  } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {

    setAnchorEl(event.currentTarget);
    // }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const stemIndex = getStemIndex(selectedStemPlayerName);
  const price =
    selectedTrackIndex === 0
      ? isSongModeState
        ? stemSectionPrices[37][index]
        : (stemSectionPrices as any)[[1, 10, 19, 28][stemIndex]][index]
      : noAirPrices[index];
  const handleMint = () => {

    onMintNft(price, index);
    handleClose();
  };

  return (
    <Box
      position={"absolute"}
      top={0}
      zIndex={3}
      height="100%"
      // border="1px solid white"
      style={{
        transition: "all 0.2s",
        background: "rgba(0, 0, 0, 0.4)",
        borderWidth: "0 1px",
        borderStyle: "solid",
        borderColor: "hsl(0, 0%, 20%)",
      }}
      left={left}
      width={width}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <ButtonGroup size="small">
        <IconButton onClick={onPlayOrPause} size="small">
          {isPlaying ? (
            <PauseIcon sx={{ height: 25, width: 25 }} />
          ) : (
            <PlayArrowIcon sx={{ height: 25, width: 25 }} />
          )}
        </IconButton>
        {selectedTrackIndex !== 1 && (
          <IconButton size="small" onClick={toggleSongOrStemMode}>
            {isSongModeState ? (
              <QueueMusicIcon sx={{ height: 25, width: 25 }} />
            ) : (
              <MusicNoteIcon sx={{ height: 25, width: 25 }} />
            )}
          </IconButton>
        )}
        <IconButton size="small" onClick={handleClick} disabled={open}>
          <ShopIcon />
        </IconButton>
      </ButtonGroup>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={2}>
          <Grid container>
            <Grid item xs={6}>
              {selectedTrackIndex === 0 ? "MOVR" : "USDC"}
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
              {price}
            </Grid>
            {selectedTrackIndex === 1 && (
              <>
                {" "}
                <Grid mt={2} item xs={6}>
                  <Typography variant="subtitle1">IRR</Typography>
                  <Box>
                    <Typography variant="caption">Estimate</Typography>
                  </Box>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid mt={2} item xs={4}>
                  5.89%
                </Grid>
              </>
            )}
          </Grid>
          <Box mt={2} display="flex" justifyContent="center">
            <Button variant="contained" onClick={handleMint}>
              Mint
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default CanvasSectionBox;
