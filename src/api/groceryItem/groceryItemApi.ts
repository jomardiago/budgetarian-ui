import api from '../api';
import { ApiRequestConfig } from '../api.types';

export type GroceryItem = {
  _id?: string;
  name: string;
  description: string;
  price?: number | string;
  quantity: number;
};

export const fetchGroceries = (config: ApiRequestConfig = {}) => {
  return api.get<GroceryItem[]>('grocery-items', config).then((res) => res.data);
};

export const postGroceryItem = (product: Omit<GroceryItem, '_id'>) => api.post('grocery-items', product);

export const updateGroceryItem = (product: GroceryItem) => api.put(`grocery-items/${product._id}`, product);

export const deleteGroceryItem = (id: string) => api.delete(`grocery-items/${id}`);
