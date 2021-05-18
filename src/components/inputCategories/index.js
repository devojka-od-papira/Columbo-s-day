import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { listCategories } from "./categories";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { fetchByCategoryAction } from "../../actions";

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

function Categories({ selectedLocation }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const distance = useSelector((state) => state.geodata.distance);
  const myCoordinates = useSelector((state) => state.geodata.myCoordinates);

  const handleCategory = (category) => {
    dispatch(fetchByCategoryAction(category, myCoordinates, distance));
  };

  console.log("sele", selectedLocation);
  return (
    <div className={classes.root}>
      <Autocomplete
        className={classes.input}
        id="auto-complete"
        options={listCategories}
        autoComplete
        getOptionLabel={(option) => option.name}
        includeInputInList
        fullWidth
        renderOption={(option) => (
          <Box onClick={() => handleCategory(option.fullName)}>
            {option.name}
          </Box>
        )}
        disabled={!selectedLocation}
        renderInput={(params) => (
          <TextField
            color="secondary"
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
