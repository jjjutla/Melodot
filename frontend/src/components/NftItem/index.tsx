import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

export const NftItem = (props: any) => {
  const {
    bars,
    attributes: { sections },
  } = props.data;

  return (
    <Box>
      {/* <Card>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-around">
            <Box>
              <Typography>Bars: {bars}</Typography>
              <Box>
                {sections.map((section: any) => (
                  <Chip
                    sx={{ margin: 1, marginLeft: 0 }}
                    label={section}
                  ></Chip>
                ))}
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  // pl: 1,
                  // opacity: 0.2,
                }}
              >
                <IconButton aria-label="previous">
                  <SkipPreviousIcon />
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <IconButton aria-label="next">
                  <SkipNextIcon />
                </IconButton>
                <Button>Mint</Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
        <CardActions >
          <Button>Buy</Button>
        </CardActions>
      </Card> */}
    </Box>
  );
};
