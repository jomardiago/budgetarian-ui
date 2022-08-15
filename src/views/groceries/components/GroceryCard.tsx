import { useContext, useState } from 'react';
import { GroceriesContext, GroceriesContextValue } from '../context/GroceriesContext';
import { Grocery } from '../Groceries';

type GroceryCardProps = {
  grocery: Grocery;
};

const GroceryCard = (props: GroceryCardProps) => {
  const { grocery } = props;
  const { groceries, setGroceries, setGrocery, setIsEdit } = useContext(GroceriesContext) as GroceriesContextValue;
  const [isVisible, setIsVisible] = useState(false);

  const handleOnEdit = () => {
    setIsEdit(true);
    setGrocery(grocery);
  };

  const handleOnDelete = () => {
    const updatedGroceries = groceries.filter((existingGrocery) => existingGrocery.id !== grocery.id);
    setGroceries(updatedGroceries);
  };

  return (
    <div className="shadow-md p-2 flex flex-col gap-2 bg-blue-100">
      <span className="flex justify-between cursor-pointer font-semibold" onClick={() => setIsVisible((visible) => !visible)}>
        <p>{grocery.name} ({grocery.quantity})</p>
        <p>Total Price: {grocery.quantity * grocery.price}</p>
      </span>
      {isVisible ? (
        <div className="flex justify-between">
          <div>
            <p>Description: {grocery.description}</p>
            <p>Price: {grocery.price}</p>
            <p>Quantity: {grocery.quantity}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button className="bg-blue-500 px-4 py-1 rounded-sm text-white" onClick={handleOnEdit}>
              Edit
            </button>
            <button className="bg-red-500 px-4 py-1 rounded-sm text-white" onClick={handleOnDelete}>
              Delete
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GroceryCard;
