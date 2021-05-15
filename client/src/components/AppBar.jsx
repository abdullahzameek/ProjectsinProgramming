import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {useHistory} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import SimpleModel from './SimpleModal';

const useStyles = makeStyles((theme) => ({
  nav: {
    backgroundColor: "#ffffff",
    height: "12%",
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    color:"#000000"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color:"#000000"
  },
}));

//this is the header bar with the title and the homebutton
export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();

  const goHome = () => {
    history.push('/')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.nav}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Fare Comparer
          </Typography>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={goHome}>
            <SimpleModel/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
