import React, { useContext, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { postGroceryItem, updateGroceryItem } from '@/api/groceryItem/groceryItemApi';
import { GroceriesContext, GroceriesContextValue, initialGroceryValue } from '../context/GroceriesContext';

type GroceryFormProps = {};

const GroceryForm = (props: GroceryFormProps) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { grocery, setGrocery, isEdit, setIsEdit } = useContext(GroceriesContext) as GroceriesContextValue;

  const queryClient = useQueryClient();
  const createProductMutation = useMutation(postGroceryItem);
  const updateProductMutation = useMutation(updateGroceryItem);

  const formFieldClass = 'w-full flex flex-col gap-1';
  const formFieldInputClass = 'border-2 p-2 rounded-md';

  const onSuccessCallback = () => {
    setGrocery(initialGroceryValue);
    queryClient.invalidateQueries('grocery-items');
    setIsEdit(false);
    toast.success('Grocery Item Saved...', {
      autoClose: 2000
    });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!grocery.name || !grocery.description || grocery.price === 0 || grocery.quantity === 0) {
      return;
    }

    if (isEdit) {
      await updateProductMutation.mutate(grocery, {
        onSuccess: () => onSuccessCallback(),
      });
    } else {
      delete grocery._id;
      await createProductMutation.mutate(grocery, {
        onSuccess: () => onSuccessCallback(),
      });
    }

    nameInputRef.current?.focus();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGrocery((grocery) => {
      return {
        ...grocery,
        [e.target.name]: e.target.value,
      };
    });
  };

  const clearForm = () => {
    setGrocery(initialGroceryValue);
    setIsEdit(false);
  };

  return (
    <div className="shadow-md p-4 rounded-md bg-slate-600">
      <form className="w-full flex flex-col gap-2" onSubmit={handleOnSubmit}>
        <div className={formFieldClass}>
          <label htmlFor="name" className="text-sm text-white">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter product name"
            className={formFieldInputClass}
            onChange={handleOnChange}
            value={grocery.name}
            ref={nameInputRef}
            required
          />
        </div>
        <div className={formFieldClass}>
          <label htmlFor="description" className="text-sm text-white">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Enter product description"
            className={formFieldInputClass}
            onChange={handleOnChange}
            value={grocery.description}
          />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className={formFieldClass}>
            <label htmlFor="price" className="text-sm text-white">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter product price"
              className={formFieldInputClass}
              onChange={handleOnChange}
              value={grocery.price}
              required
            />
          </div>
          <div className={formFieldClass}>
            <label htmlFor="quantity" className="text-sm text-white">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Enter product quantity"
              className={formFieldInputClass}
              onChange={handleOnChange}
              value={grocery.quantity}
              required
            />
          </div>
        </div>
        <div className="flex items-center gap-4 w-full pt-2">
          <button type="submit" className="px-6 py-2 bg-orange-300 text-white rounded-md w-full">
            {isEdit ? 'Update' : 'Save'}
          </button>
          <button className="px-6 py-2 bg-rose-400 text-white rounded-md w-full" onClick={clearForm}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default GroceryForm;
