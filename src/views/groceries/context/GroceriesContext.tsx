import { GroceryItem } from '@/api/groceryItem/groceryItemApi';
import React, { createContext, useState } from 'react';

export const initialGroceryValue = {
  _id: '',
  name: '',
  description: '',
  price: 0,
  quantity: 1,
};

export type GroceriesContextValue = {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  grocery: GroceryItem;
  setGrocery: React.Dispatch<React.SetStateAction<GroceryItem>>;
  groceries: GroceryItem[];
  setGroceries: React.Dispatch<React.SetStateAction<GroceryItem[]>>;
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
  const [grocery, setGrocery] = useState<GroceryItem>(initialGroceryValue);
  const [groceries, setGroceries] = useState<GroceryItem[]>([]);
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
