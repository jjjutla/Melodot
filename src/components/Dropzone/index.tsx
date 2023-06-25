import { Paper, Box, Button } from "@mui/material";

const AcceptStems = (props: any) => {
  const { getInputProps, getRootProps } = props;
  const { ref, ...rootProps } = getRootProps();

  return (
    <Button variant="contained" color="primary" {...rootProps}>
      <Paper sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
        <Box p={4}>
          <input {...getInputProps()} />
          <p>Upload your stem files (max 4)</p>
        </Box>
      </Paper>
    </Button>
  );
};

export default AcceptStems;
