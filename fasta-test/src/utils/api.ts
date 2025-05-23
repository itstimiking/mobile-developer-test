import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL; // This will be stored in .env
const SECRETE_KEY = process.env.EXPO_PUBLIC_API_KEY; // This will be stored in .env 

interface ApiErrorResponse {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
}

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'x-api-key': SECRETE_KEY
  },
});

// api.interceptors.request.use(
//   async (config: any) => {
//     const token = await AsyncStorage.getItem('userToken');
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      
      if (error.response.status === 401) {
        console.log('Unauthorized, logging out...');
        AsyncStorage.removeItem('userToken');
      }
      
      const apiError: ApiErrorResponse = {
        statusCode: error.response.status,
        message: error.response.data?.message || 'An error occurred',
        errors: error.response.data?.errors,
      };
      
      return Promise.reject(apiError);
    } else if (error.request) {
      console.error('API Request Error:', error.request);
      return Promise.reject({
        statusCode: 0,
        message: 'Network error - no response received',
      });
    } else {
      console.error('API Setup Error:', error.message);
      return Promise.reject({
        statusCode: 0,
        message: error.message || 'Request setup failed',
      });
    }
  }
);

export default api;