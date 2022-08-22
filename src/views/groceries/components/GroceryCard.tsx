import { deleteGroceryItem, GroceryItem } from '@/api/groceryItem/groceryItemApi';
import { formatCurrency } from '@/helpers/currency-utils';
import { info, warn } from '@/helpers/toast-utils';
import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { TrashIcon, PencilIcon, XIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { GroceriesContext, GroceriesContextValue } from '../context/GroceriesContext';

type GroceryCardProps = {
  grocery: GroceryItem;
  formDivRef: React.RefObject<HTMLDivElement>;
};

const GroceryCard = (props: GroceryCardProps) => {
  const { grocery, formDivRef } = props;
  const { setGrocery, setIsEdit, grocery: selectedGrocery } = useContext(GroceriesContext) as GroceriesContextValue;
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
    if (grocery._id === selectedGrocery._id) {
      warn('Grocery item currently selected...');
    } else {
      if (grocery._id) {
        await deleteGroceryItemMutation.mutate(grocery._id, {
          onSuccess: () => {
            queryClient.invalidateQueries('grocery-items');
            info('Grocery item deleted...');
          },
        });
      }
    }
  };

  return (
    <div className="shadow-md flex flex-col gap-2 bg-slate-300 rounded-sm pt-1">
      <div className="flex justify-between font-semibold items-center p-1">
        <span className="flex items-center gap-2">
          <XIcon className="h-5 w-5 text-gray-800 cursor-pointer" onClick={handleOnDelete} />
          <span className="cursor-pointer" onClick={() => setIsVisible((visible) => !visible)}>
            <p className="flex items-center gap-1">
              {grocery.name} ({grocery.quantity})
              {isVisible ? <ChevronUpIcon className="h-4 w-4 text-gray" /> : <ChevronDownIcon className="h-4 w-4 text-gray" />}
            </p>
          </span>
        </span>
        <p>{formatCurrency(grocery.quantity * grocery.price)}</p>
      </div>
      {isVisible ? (
        <div className="flex justify-between pt-2 p-4 bg-slate-50">
          <div>
            <p>
              <span className="font-semibold">Description:</span> {grocery.description}
            </p>
            <p>
              <span className="font-semibold">Price:</span> {formatCurrency(grocery.price)}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span> {grocery.quantity}
            </p>
          </div>
          <div className="my-auto flex gap-2">
            <button onClick={handleOnDelete}>
              <TrashIcon className="h-5 w-5 text-red-500" />
            </button>
            <span className="border-[1px] h-5 bg-slate-900"></span>
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
