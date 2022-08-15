import React, { useContext } from 'react';
import { GroceriesContext, GroceriesContextValue } from '../context/GroceriesContext';

type GroceryFormProps = {};

const GroceryForm = (props: GroceryFormProps) => {
  const { grocery, setGrocery, groceries, setGroceries, isEdit, setIsEdit } = useContext(GroceriesContext) as GroceriesContextValue;

  const formFieldClass = 'w-full flex flex-col';
  const formFieldInputClass = 'border-2 p-2 rounded-sm';

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!grocery.name || !grocery.description || grocery.price === 0 || grocery.quantity === 0) {
      return;
    }

    if (isEdit) {
      const updatedGroceries = groceries.map((existingGrocery) => {
        if (grocery.id === existingGrocery.id) {
          return {
            ...grocery,
          };
        }
        return grocery;
      });

      setGroceries(updatedGroceries);
      setIsEdit(false);
    } else {
      setGroceries((groceries) => {
        return [...groceries, { ...grocery, id: Math.floor(Math.random() * 100).toString() }];
      });
    }

    setGrocery({
      id: '',
      name: '',
      description: '',
      price: 0,
      quantity: 0,
    });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGrocery((grocery) => {
      return {
        ...grocery,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div>
      <form className="w-full flex flex-col gap-2" onSubmit={handleOnSubmit}>
        <div className={formFieldClass}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter product name"
            className={formFieldInputClass}
            onChange={handleOnChange}
            value={grocery.name}
          />
        </div>
        <div className={formFieldClass}>
          <label htmlFor="description">Description</label>
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
        <div className={formFieldClass}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter product price"
            className={formFieldInputClass}
            onChange={handleOnChange}
            value={grocery.price}
          />
        </div>
        <div className={formFieldClass}>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Enter product quantity"
            className={formFieldInputClass}
            onChange={handleOnChange}
            value={grocery.quantity}
          />
        </div>
        <div>
          <button type="submit" className="px-4 py-1 bg-blue-500 text-white rounded-sm">
            {isEdit ? 'Save' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GroceryForm;
