import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { listCategories } from "./categories";
import Autocomplete from "@material-ui/lab/Autocomplete";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));
function Categories({ getCategorie }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Autocomplete
        className={classes.input}
        id="auto-complete"
        options={listCategories}
        autoComplete
        getOptionLabel={(option) => option}
        includeInputInList
        fullWidth
        renderOption={(option) => (
          <Box onClick={() => getCategorie(option)}>{option}</Box>
        )}
        renderInput={(params) => (
          <TextField
            className={classes.textField}
            {...params}
            id="standard-full-width"
            label="Choose categories to search"
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      ></Autocomplete>
    </div>
  );
}
export default Categories;
