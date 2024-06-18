import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEV_API = 'http://192.168.1.8:3003/api/v1/';
const PROD_API = 'https://readnow.xyz/api/v1/';

const apiInstance = axios.create({
  baseURL: PROD_API,
});

apiInstance.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    try {
      config.headers.Authorization = 'Bearer ' + token;
    } catch (error) {
      await AsyncStorage.removeItem('token');
    }
  }
  return config;
});

export default apiInstance;
