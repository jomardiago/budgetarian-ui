import { deleteGroceryItem, GroceryItem } from '@/api/groceryItem/groceryItemApi';
import { formatCurrency } from '@/helpers/currency-utils';
import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { TrashIcon, PencilIcon, XIcon} from '@heroicons/react/outline';
import { GroceriesContext, GroceriesContextValue } from '../context/GroceriesContext';

type GroceryCardProps = {
  grocery: GroceryItem;
  formDivRef: React.RefObject<HTMLDivElement>;
};

const GroceryCard = (props: GroceryCardProps) => {
  const { grocery, formDivRef } = props;
  const { setGrocery, setIsEdit } = useContext(GroceriesContext) as GroceriesContextValue;
  const [isVisible, setIsVisible] = useState(false);

  const queryClient = useQueryClient();
  const deleteGroceryItemMutation = useMutation(deleteGroceryItem);

  const handleOnEdit = () => {
    setIsEdit(true);
    setGrocery(grocery);
    if (formDivRef && formDivRef.current) {
      formDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOnDelete = async () => {
    if (grocery._id) {
      await deleteGroceryItemMutation.mutate(grocery._id, {
        onSuccess: () => queryClient.invalidateQueries('grocery-items'),
      });
    }
  };

  return (
    <div className="shadow-md flex flex-col gap-2 bg-slate-300 rounded-sm">
      <div className="flex justify-between font-semibold items-center p-1">
        <span className="flex items-center gap-2">
          <XIcon className="h-5 w-5 text-gray-800 cursor-pointer" onClick={handleOnDelete} />
          <span className="cursor-pointer" onClick={() => setIsVisible((visible) => !visible)}>
            <p>
              {grocery.name} ({grocery.quantity})
            </p>
          </span>
        </span>
        <p>{formatCurrency(grocery.quantity * grocery.price)}</p>
      </div>
      {isVisible ? (
        <div className="flex justify-between pt-2 p-4 bg-slate-50">
          <div>
            <p>Description: {grocery.description}</p>
            <p>Price: {formatCurrency(grocery.price)}</p>
            <p>Quantity: {grocery.quantity}</p>
          </div>
          <div className="my-auto flex gap-2">
            <button onClick={handleOnDelete}>
              <TrashIcon className="h-5 w-5 text-red-500" />
            </button>
            <button onClick={handleOnEdit}>
              <PencilIcon className="h-5 w-5 text-blue-500" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GroceryCard;
