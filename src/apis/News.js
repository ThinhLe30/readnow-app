import axios from 'axios';

const LOCAL_API = 'http://192.168.5.2:3003/api/v1/';
export default axios.create({
  baseURL: LOCAL_API,
});
