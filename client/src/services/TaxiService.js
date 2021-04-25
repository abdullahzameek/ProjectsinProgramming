import http from "../http-common";

//put all the api-related logic separate from the core frontend components
const home = (params) => {
  return http.get("/", { params });
};

const getFares = (data) => {
  return http.post("/getFares", data);
};

const routes = {
  home,
  getFares,
};

export default routes;
