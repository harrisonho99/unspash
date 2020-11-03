import axios from "axios";
export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: "Client-ID 8-wd7Y4wCMNurIjBF8Cg1FX1HdM-JZIiVlnjVKoAv2I"
  }
});
