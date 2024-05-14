import axios from 'axios';

const LOCAL_API = 'http://192.168.5.4:3003/api/v1/';
const NEWS_API = 'https://newsapi.org/v2/';
export default axios.create({
  baseURL: LOCAL_API,
});
