import * as axios from 'axios';

//set up the link to the api with axios over here
export default axios.create({
  baseURL: "https://findr-api.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});

