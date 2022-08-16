import { GroceryItem } from '@/api/groceryItem/groceryItemApi';

export const getTotal = (groceries: GroceryItem[]) => groceries.reduce((total, grocery) => total + grocery.price * grocery.quantity, 0);
