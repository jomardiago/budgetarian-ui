import api from '../api';
import { ApiRequestConfig } from '../api.types';

export type Grocery = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
};

export const fetchProducts = (config: ApiRequestConfig = {}) => {
  return api.get<Grocery[]>('products', config).then((res) => res.data);
};

export const postProduct = (product: Omit<Grocery, '_id'>) => api.post('products', product);
