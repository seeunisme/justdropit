import { S3ImageData } from '@interfaces/index';
import axios, { AxiosRequestConfig } from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://picktalk.ml';

const getConfig = (): AxiosRequestConfig => {
  const config: AxiosRequestConfig = {};

  return config;
};

export const getRequest = async <T>(url: string, query?: string): Promise<T> => {
  const reqQuery = `${query && query.length > 0 ? `?${query}` : ''}`;

  const result = await axios.get<T>(baseUrl + url + reqQuery, getConfig());

  return result.data;
};

export const postRequest = async <T>(url: string, body: any): Promise<T> => {
  const result = await axios.post<T>(baseUrl + url, body, getConfig());

  return result.data;
};

export const uploadImage = async (path: string, images: File[]): Promise<S3ImageData[]> => {
  const form = new FormData();
  form.append('path', path);
  images.forEach((img) => form.append('files', img));

  const result = await axios.post<S3ImageData[]>(baseUrl + '/file/uploadFile', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return result.data;
};
