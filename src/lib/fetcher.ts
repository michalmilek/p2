import { APP_CONFIG } from '@/config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const githubInstance: AxiosInstance = axios.create({
    baseURL: APP_CONFIG.githubAPI, // Set your base URL here
    timeout: 10000,                      // Example of setting a timeout
    headers: { 'Content-Type': 'application/json' },
  });
  

export const fetcher = async <T>(...args: [string, object?]): Promise<T> => {
  const response: AxiosResponse<T> = await axios(...args);
  return response.data;
};

export const githubFetcher = async <T>(...args: [string, object?]): Promise<T> => {
    const response: AxiosResponse<T> = await githubInstance(...args);
    return response.data;
  };
  
