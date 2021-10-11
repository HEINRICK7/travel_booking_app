import axios from "axios";

const api = axios.create({
  baseURL: "https://travelapi-backend.herokuapp.com"
});


export default api;