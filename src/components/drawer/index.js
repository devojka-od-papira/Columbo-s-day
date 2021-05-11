import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MapIcon from "@material-ui/icons/Map";
import SatelliteIcon from "@material-ui/icons/Satellite";
import TerrainTwoToneIcon from "@material-ui/icons/TerrainTwoTone";
import TrafficIcon from "@material-ui/icons/Traffic";

const useStyles = makeStyles({
  list: {
    width: 500,
  },
  h1: {
    margin: 15,
    fontSize: 24,
  },
});
const MyDrawer = () => {
  const classes = useStyles();
  const listName = [
    { name: "Mapa", icon: <MapIcon /> },
    { name: "Satelit", icon: <SatelliteIcon /> },
    { name: "Teren", icon: <TerrainTwoToneIcon /> },
    { name: "Saobracaj", icon: <TrafficIcon /> },
  ];
  return (
    <div className={classes.list}>
      <Drawer>
        <div style={{ width: 425, marginTop: 80 }}>
          <h1 className={classes.h1}>Columbo's day</h1>
          <Divider />
          <List>
            {listName.map(({ name, icon }) => (
              <ListItem button key={name}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{name}</ListItemText>
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      </Drawer>
    </div>
  );
};
export default MyDrawer;
