import axios from "axios";

const api = axios.create({
  baseURL:"https://travel-developer-api.herokuapp.com"
  //baseURL: "http://localhost:3333"
});


export default api;