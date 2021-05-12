import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 200,
    margin: 20,
  },
});

const marks = [
  {
    value: 0,
    label: "0 m",
  },
  {
    value: 100,
    label: "1000 m",
  },
];

function MySlider({ distance, handleChangeDistance }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-restrict">Select a value</Typography>
      <Slider
        value={distance}
        onChange={handleChangeDistance}
        step={1}
        marks={marks}
        valueLabelDisplay="auto"
        color="secondary"
      />
    </div>
  );
}
export default MySlider;
