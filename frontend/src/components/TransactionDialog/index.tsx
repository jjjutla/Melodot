import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const TransactionDialog = (props: any) => {
  const {
    isTxDialogOpen,
    activeTxStep,
    onTxDialogClose,
    fullTrackHash,
    stemsHash,
    sectionsHash,
    isEncryptFiles,
  } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog fullWidth open={isTxDialogOpen} fullScreen={fullScreen}>
      <DialogTitle>Music Metadata Creation</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeTxStep} orientation="vertical">
          <Step>
            <StepLabel>
              <Typography>Music Assets Storage</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="caption">
                {isEncryptFiles
                  ? "Encrypting and Storing on Web3.Storage"
                  : "Storing on Web3.Storage"}
              </Typography>
              <LinearProgress color="secondary" />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <Typography>Submitting Fulltrack</Typography>
              {fullTrackHash === "error" ? (
                <Typography variant="caption" color="error">
                  Rococo blockchain node is offline at the moment.
                </Typography>
              ) : (
                <Typography variant="caption">{fullTrackHash}</Typography>
              )}
            </StepLabel>
            <StepContent>
              <Typography variant="caption">
                Transaction in progress...
              </Typography>
              <LinearProgress color="secondary" />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <Typography>Submitting Proof of Creation (stems)</Typography>
              {fullTrackHash === "error" ? (
                <Typography variant="caption" color="error">
                  Rococo blockchain node is offline at the moment.
                </Typography>
              ) : (
                stemsHash.map((stemHash: string) => (
                  <Typography variant="caption">{stemHash}</Typography>
                ))
              )}
            </StepLabel>
            <StepContent>
              <Typography variant="caption">
                Transaction in progress...
              </Typography>
              <LinearProgress color="secondary" />
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <Typography>Submitting Sections</Typography>
              {fullTrackHash === "error" ? (
                <Typography variant="caption" color="error">
                  Rococo blockchain node is offline at the moment.
                </Typography>
              ) : (
                sectionsHash.map((sectionHash: string) => (
                  <Typography variant="caption">{sectionHash}</Typography>
                ))
              )}
            </StepLabel>
            <StepContent>
              <Typography variant="caption">
                Transaction in progress...
              </Typography>
              <LinearProgress color="secondary" />
            </StepContent>
          </Step>
        </Stepper>
      </DialogContent>
      <DialogActions>
        {activeTxStep > 3 && (
          <Button variant="contained" onClick={onTxDialogClose}>
            Marketplace
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TransactionDialog;
