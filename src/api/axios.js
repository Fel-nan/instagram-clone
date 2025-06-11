import axios from 'axios';

const baseURL =process.env.REACT_APP_BASE_URL;
console.log("BASE_URL:", baseURL);


export default axios.create({
  baseURL, // Your Django backend
  headers: {
    'Content-Type': 'application/json',
  },
});
