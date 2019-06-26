import axios from 'axios';

const instance = axios.create({
  baseURL: "https://burger-builder-11061.firebaseio.com/"
});

export default instance;