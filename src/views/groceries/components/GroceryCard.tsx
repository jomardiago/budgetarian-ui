import { deleteGroceryItem, GroceryItem } from '@/api/groceryItem/groceryItemApi';
import { formatCurrency } from '@/helpers/currency-utils';
import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { GroceriesContext, GroceriesContextValue } from '../context/GroceriesContext';

type GroceryCardProps = {
  grocery: GroceryItem;
};

const GroceryCard = (props: GroceryCardProps) => {
  const { grocery } = props;
  const { setGrocery, setIsEdit } = useContext(GroceriesContext) as GroceriesContextValue;
  const [isVisible, setIsVisible] = useState(false);

  const queryClient = useQueryClient();
  const deleteGroceryItemMutation = useMutation(deleteGroceryItem);

  const handleOnEdit = () => {
    setIsEdit(true);
    setGrocery(grocery);
  };

  const handleOnDelete = async () => {
    if (grocery._id) {
      await deleteGroceryItemMutation.mutate(grocery._id, {
        onSuccess: () => queryClient.invalidateQueries('grocery-items'),
      });
    }
  };

  return (
    <div className="shadow-md p-2 flex flex-col gap-2 bg-blue-100">
      <span className="flex justify-between cursor-pointer font-semibold" onClick={() => setIsVisible((visible) => !visible)}>
        <p>
          {grocery.name} ({grocery.quantity})
        </p>
        <p>{formatCurrency(grocery.quantity * grocery.price)}</p>
      </span>
      {isVisible ? (
        <div className="flex justify-between">
          <div>
            <p>Description: {grocery.description}</p>
            <p>Price: {formatCurrency(grocery.price)}</p>
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
