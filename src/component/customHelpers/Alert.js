import { Alert as MuiAlert } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles(() => ({
  root: {
    width: "95%",
    margin: "0 16px 16px 0",
  },
}));
const Alert = ({ severity, children }) => {
  const classes = useStyles();
  return (
    <MuiAlert className={classes.root} severity={severity}>
      {children}
    </MuiAlert>
  );
};

export default Alert;
