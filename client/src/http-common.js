import * as axios from 'axios';

//set up the link to the api with axios over here
export default axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json"
  }
});

