import axios from "axios";

const PrivateAxios = axios.create({
  baseURL: "https://ruchir-alap-backend.vercel.app",
  withCredentials: true,
});

export default PrivateAxios;
