import React, { useContext, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toastConfig } from '@/helpers/toast-utils';
import { postGroceryItem, updateGroceryItem } from '@/api/groceryItem/groceryItemApi';
import { GroceriesContext, GroceriesContextValue, initialGroceryValue } from '../context/GroceriesContext';
import Input from '@/components/Input';
import { toast } from 'react-toastify';
import { AuthContext } from '@/context/AuthContext';

type GroceryFormProps = {};

const GroceryForm = (props: GroceryFormProps) => {
  const { user } = useContext(AuthContext);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { grocery, setGrocery, isEdit, setIsEdit } = useContext(GroceriesContext) as GroceriesContextValue;

  const queryClient = useQueryClient();
  const createProductMutation = useMutation(postGroceryItem);
  const updateProductMutation = useMutation(updateGroceryItem);

  const formFieldClass = 'w-full flex flex-col gap-1';
  const formFieldInputClass = 'border-2 p-2 rounded-md';

  const onSuccessCallback = () => {
    setGrocery(initialGroceryValue);
    queryClient.invalidateQueries(`grocery-items-${user?._id}`);
    setIsEdit(false);
    toast.success('Grocery item saved...', toastConfig);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
          <Input
            type="text"
            id="name"
            name="name"
            label="Name"
            className={formFieldInputClass}
            onChange={handleOnChange}
            value={grocery.name}
            inputRef={nameInputRef}
            required
          />
        </div>
        <div className={formFieldClass}>
          <Input
            type="text"
            id="description"
            name="description"
            label="Description"
            className={formFieldInputClass}
            onChange={handleOnChange}
            value={grocery.description}
          />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className={formFieldClass}>
            <Input
              type="number"
              id="price"
              name="price"
              label="Price"
              className={formFieldInputClass}
              onChange={handleOnChange}
              value={grocery.price}
              min="0"
              required
            />
          </div>
          <div className={formFieldClass}>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              label="Quantity"
              className={formFieldInputClass}
              onChange={handleOnChange}
              value={grocery.quantity}
              min="0"
              step="1"
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
