import api from '../api';

export type GroceryItem = {
  _id?: string;
  name: string;
  description: string;
  price?: number;
  quantity: number;
};

const setHeaders = () => ({
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
});

export const fetchGroceries = () => api.get<GroceryItem[]>('grocery-items', setHeaders()).then((res) => res.data);

export const postGroceryItem = (product: Omit<GroceryItem, '_id'>) => api.post('grocery-items', product, setHeaders());

export const updateGroceryItem = (product: GroceryItem) => api.put(`grocery-items/${product._id}`, product, setHeaders());

export const deleteGroceryItem = (id: string) => api.delete(`grocery-items/${id}`, setHeaders());
