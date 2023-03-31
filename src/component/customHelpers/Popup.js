import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Slide,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: "0px",
    position: "absolute",
    top: "8px",
  },
  dialogTitle: {
    paddingRight: "0px",
  },
  closeButton: {
    position: "absolute",
    right: "8px",
    top: "8px",
    color: grey[500],
  },
}));

export default function Popup(props) {
  const {
    title,
    children,
    openPopup,
    setOpenPopup,
    maxWidth = "md",
  } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      TransitionComponent={Transition}
      maxWidth={maxWidth}
      onClose={() => setOpenPopup(false)}
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
