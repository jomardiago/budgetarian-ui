import api from '../api';

export type GroceryItem = {
  _id?: string;
  name: string;
  description: string;
  price?: number;
  quantity: number;
};

export const fetchGroceries = () => api.get<GroceryItem[]>('grocery-items').then((res) => res.data);

export const postGroceryItem = (product: Omit<GroceryItem, '_id'>) => api.post('grocery-items', product);

export const updateGroceryItem = (product: GroceryItem) => api.put(`grocery-items/${product._id}`, product);

export const deleteGroceryItem = (id: string) => api.delete(`grocery-items/${id}`);
