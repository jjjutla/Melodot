import { Box } from "@mui/system";

const TransportBar = (props: { transportProgress: number }) => {
  const { transportProgress } = props;
  return (
    <Box
      style={{
        borderColor: "rgba(100, 221, 202, 0.4)",
        borderStyle: "solid",
        borderWidth: "0.5px",
        pointerEvents: "none",
      }}
      bottom={0}
      position="absolute"
      top={0}
      left={transportProgress}
    ></Box>
  );
};

export default TransportBar;
