import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Divider from "@material-ui/core/Divider";
import DirectionsRoundedIcon from "@material-ui/icons/DirectionsRounded";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationCityIcon from "@material-ui/icons/LocationCity";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    position: "fixed",
    zIndex: 1300,
    margin: theme.spacing(1),
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    marginTop: 0,
    width: "280px",
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 40,
    height: 40,
    color: "#E5E5FF",
  },
  divider: {
    height: 28,
    margin: 4,
  },
  textField: {
    marginTop: 0,
    width: 370,
  },
}));
const InputSearch = ({
  handleClick,
  onSubmit,
  handleSearch,
  positions,
  clickFlyTo,
}) => {
  const classes = useStyles();
  return (
    <Paper onSubmit={onSubmit} component="form" className={classes.root}>
      <IconButton
        className={classes.iconButton}
        aria-label="menu"
        onClick={handleClick}
      >
        <DehazeIcon style={{ zIndex: 1300, position: "absolute" }} />
      </IconButton>
      <Autocomplete
        className={classes.input}
        id="auto-complete"
        options={positions ? positions : []}
        autoComplete
        getOptionLabel={(option) => option.properties?.formatted}
        onInputChange={handleSearch}
        includeInputInList
        renderOption={(option) => (
          <Box onClick={() => clickFlyTo(option)}>
            <LocationCityIcon className={classes.icon} />
            {option.properties?.formatted}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            color="secondary"
            className={classes.textField}
            {...params}
            label="Search maps"
            margin="dense"
          />
        )}
      ></Autocomplete>
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="secondary"
        className={classes.iconButton}
        aria-label="directions"
      >
        <DirectionsRoundedIcon />
      </IconButton>
    </Paper>
  );
};
export default InputSearch;
