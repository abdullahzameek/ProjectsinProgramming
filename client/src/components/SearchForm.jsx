import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TaxiService from "../services/TaxiService";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#000000",
  },
}));

export default function SearchForm() {
  const [inputFields, setInputFields] = useState({
    origin: "",
    destination: "",
  });

  const [fetchedData, setFetchedData] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputFields({ ...inputFields, [name]: value });
  };

  const history = useHistory();

  //valid that the search form is not completely empty, that the treeId and postcode are numeric before sending
  //the search request

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const onSubmit = async () => {
    let isEmpty = true;
    for (var key in inputFields) {
      if (inputFields[key] !== "") {
        isEmpty = false;
      }
    }
    if (isEmpty === true) {
      alert("You need to enter at least one search term!");
    }

    if (isEmpty === false) {
      let queryObj = {};
      for (var k in inputFields) {
        if (inputFields[k] !== "") {
          queryObj[k] = inputFields[k];
        }
      }

      let origin_data = await axios
        .get(
          ` https://api.opencagedata.com/geocode/v1/json?q=${inputFields["origin"]}&key=b1bb29d0736d47a7ab7b51abda8c8fec `
        )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("this is the origin data");
      let pickup = origin_data["results"][0]["geometry"];

      let destination = await axios
        .get(
          ` https://api.opencagedata.com/geocode/v1/json?q=${inputFields["destination"]}&key=b1bb29d0736d47a7ab7b51abda8c8fec `
        )
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("this is the destination data");
      let dropoff = destination["results"][0]["geometry"];

      console.log(pickup);
      console.log(dropoff);

      let dist = getDistanceFromLatLonInKm(
        pickup["lat"],
        pickup["lng"],
        dropoff["lat"],
        dropoff["lng"]
      );
      console.log(dist);

      let currentDate = new Date();
      currentDate = currentDate.toISOString();
      let reqObj = {
        distance: dist,
        pickup_datetime: currentDate,
      };
      console.log(reqObj);
      let d = await TaxiService.getFares(reqObj).then((resp) => {
        console.log(resp.data);
        setFetchedData(resp.data);
        setIsFetched(true);
      });
      console.log("here is fetched");
      console.log(fetchedData);
    }
  };

  const classes = useStyles();

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Enter Origin and Destination!
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="origin"
              label="origin"
              name="origin"
              onChange={handleOnChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="destination"
              label="destination"
              onChange={handleOnChange}
              id="destination"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              Get Fares!
            </Button>
          </form>
        </div>
      </Container>
      {isFetched === true &&
      <>
      <center><h3>Yellow Taxi:</h3> <p>{Number(fetchedData['yellow_taxi']).toFixed(2)}</p></center>
      <center><h3>Uber: </h3> <p>{Number(fetchedData['uber']).toFixed(2)}</p></center>
      <center><h3>Lyft: </h3> <p>{Number(fetchedData['lyft']).toFixed(2)}</p></center>
      </>
      }
    </>
  );
}
