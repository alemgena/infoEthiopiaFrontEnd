import React from "react";
import {
  Autocomplete as MuiAutocomplete,
  CircularProgress,
  TextField,
} from "@mui/material";

const AutoComplete = ({ value, options, setChange, label }) => {
  const [open, setOpen] = React.useState(false);
  const loadingA = open && options.length === 0;
  return (
    <MuiAutocomplete
      value={value}
      onChange={(event, newValue) => {
        setChange(newValue);
      }}
      options={options}
      sx={{ width: "100%" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      loading={loadingA}
      renderInput={(params) => {
        return (
          <TextField
            autoComplete="off"
            {...params}
            label={label}
            fullWidth
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loadingA ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        );
      }}
    />
  );
};

export default AutoComplete;
