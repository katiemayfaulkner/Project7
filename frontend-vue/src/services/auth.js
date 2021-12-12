import axios from 'axios';

const url = 'http://localhost:3000/';

export default {
  login(credentials) {
    return axios
      .post(url + 'login/', credentials)
      .then(response => response.data);
  },
  signUp(credentials) {
    return axios
      .post(url + 'signup/', credentials)
      .then(response => response.data);
  },
};