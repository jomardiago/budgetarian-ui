import { ShoppingCartIcon, SaveAsIcon } from '@heroicons/react/outline';
import { GroceryItem } from '@/api/groceryItem/groceryItemApi';
import { formatCurrency } from '@/helpers/currency-utils';
import { getTotal } from '../helpers/grocery-utils';
import GroceryCard from './GroceryCard';

type GroceryListProps = {
  groceries: GroceryItem[];
  formDivRef: React.RefObject<HTMLDivElement>;
};

const GroceryList = (props: GroceryListProps) => {
  const { groceries, formDivRef } = props;
  const total = getTotal(groceries);

  return (
    <div>
      {groceries.length === 0 ? (
        <span className="flex items-center gap-2 justify-center">
          <ShoppingCartIcon className="h-5 w-5 text-white" />
          <p className="text-white text-center">Your grocery is empty...</p>
        </span>
      ) : (
        <div className="flex flex-col gap-2 bg-slate-600 py-4 px-2 rounded-md mb-4">
          {groceries.map((grocery) => (
            <GroceryCard key={grocery._id} grocery={grocery} formDivRef={formDivRef} />
          ))}
          <p className="text-3xl font-semibold text-right mt-2 text-white">Total: {formatCurrency(total)}</p>
        </div>
      )}
    </div>
  );
};

export default GroceryList;
