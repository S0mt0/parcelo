import axios from "axios";

// const BASE_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://dashboard-01-server-4fd151ce1921.herokuapp.com/api/v1"
//     : "http://localhost:8000/api/v1";

const BASE_URL =
  "https://dashboard-01-server-4fd151ce1921.herokuapp.com/api/v1";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
