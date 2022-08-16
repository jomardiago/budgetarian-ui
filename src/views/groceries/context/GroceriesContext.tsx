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
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  grocery: Grocery;
  setGrocery: React.Dispatch<React.SetStateAction<Grocery>>;
  groceries: Grocery[];
  setGroceries: React.Dispatch<React.SetStateAction<Grocery[]>>;
};

export const GroceriesContext = createContext<GroceriesContextValue>({
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

  return (
    <GroceriesContext.Provider
      value={{
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
