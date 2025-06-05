import axios from 'axios';

export default axios.create({
  baseURL: 'http://felnan.pythonanywhere.com/', // Your Django backend
  headers: {
    'Content-Type': 'application/json',
  },
});
