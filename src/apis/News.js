import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LOCAL_API = 'http://192.168.1.7:3003/api/v1/';
const DEV_API = 'http://65.0.120.252:3003/api/v1/';

const apiInstance = axios.create({
  baseURL: DEV_API,
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
