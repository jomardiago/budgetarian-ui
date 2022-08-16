import { Grocery } from '@/api/products/productApi';

export const getTotal = (groceries: Grocery[]) => groceries.reduce((total, grocery) => total + grocery.price * grocery.quantity, 0);
