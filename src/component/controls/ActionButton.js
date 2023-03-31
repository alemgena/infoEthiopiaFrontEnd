import React from "react";
import { makeStyles } from '@mui/styles';
import Tooltip from "@mui/material/Tooltip";
import {Button} from '@mui/material'
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5),
  },
  secondary: {
    backgroundColor: theme.palette.secondary.contrastText,
    "& .MuiButton-label": {
      color: theme.palette.secondary.main,
    },
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    "& .MuiButton-label": {
      color: theme.palette.primary.contrastText,
    },
  },
}));

export default function ActionButton(props) {
  const { color, children, onClick, disabled, title = "add" } = props;

  const classes = useStyles();

  return (
    <Tooltip title={title} aria-label="add">
      <Button
        className={`${classes.root} ${classes[color]}`}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </Button>
    </Tooltip>
  );
}
