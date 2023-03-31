import React from "react";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { useTheme } from "@mui/material/styles";
const useStyles = makeStyles(() => ({
  root: {
    top: 72,
    paddingRight: 18,
  },
}));

export default function Notification(props) {
  const { notify, setNotify } = props;

  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify(false);
  };

  return (
    <Snackbar
      className={classes.root}
      open={notify}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert severity="error" onClose={handleClose}>
        Please choose a state.
      </Alert>
    </Snackbar>
  );
}
