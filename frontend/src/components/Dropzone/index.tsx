import { Paper, Box } from "@mui/material";

const AcceptStems = (props: any) => {
  const { getInputProps, getRootProps } = props;
  const { ref, ...rootProps } = getRootProps();

  return (
    <Paper {...rootProps}>
      <Box p={4}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop Stem files here, or click to select files upto 4</p>
      </Box>
    </Paper>
  );
};

export default AcceptStems;
