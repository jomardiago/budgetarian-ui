import { Grocery } from '@/api/products/productApi';
import React, { createContext, useState } from 'react';

const initialGroceryValue = {
  _id: '',
  name: '',
  description: '',
  price: 0,
  quantity: 0,
};

export type GroceriesContextValue = {
  total: number;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  grocery: Grocery;
  setGrocery: React.Dispatch<React.SetStateAction<Grocery>>;
  groceries: Grocery[];
  setGroceries: React.Dispatch<React.SetStateAction<Grocery[]>>;
};

export const GroceriesContext = createContext<GroceriesContextValue>({
  total: 0,
  isEdit: false,
  setIsEdit: () => {},
  grocery: initialGroceryValue,
  setGrocery: () => {},
  groceries: [],
  setGroceries: () => {},
});

type GroceriesContextProviderProps = {
  children: React.ReactNode;
};

const GroceriesContextProvider = (props: GroceriesContextProviderProps) => {
  const { children } = props;
  const [grocery, setGrocery] = useState<Grocery>(initialGroceryValue);
  const [groceries, setGroceries] = useState<Grocery[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const total = groceries.reduce((total, grocery) => total + grocery.price * grocery.quantity, 0);

  return (
    <GroceriesContext.Provider
      value={{
        total,
        isEdit,
        setIsEdit,
        grocery,
        setGrocery,
        groceries,
        setGroceries,
      }}
    >
      {children}
    </GroceriesContext.Provider>
  );
};

export default GroceriesContextProvider;
