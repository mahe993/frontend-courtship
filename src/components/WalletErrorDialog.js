import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const WalletErrorDialog = (props) => {
  const { openWalletErrorDialog, setOpenWalletErrorDialog } = props;

  const navigate = useNavigate();

  const handleClose = () => {
    setOpenWalletErrorDialog(false);
  };

  return (
    <Box>
      <Dialog open={openWalletErrorDialog} onClose={handleClose}>
        <DialogTitle>Not enough funds in wallet!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You do not currently have enough funds to make this booking. Please
            ensure minimum funds for deductibles of:
            <br />
            <br />
            <em>(2 hours * per hour booking amount)</em>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose();
              navigate("/account");
            }}
            autoFocus
          >
            Go to Wallet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WalletErrorDialog;
