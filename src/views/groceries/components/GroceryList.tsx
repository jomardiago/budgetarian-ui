import { Grocery } from '@/api/products/productApi';
import { formatCurrency } from '@/helpers/currency-utils';
import { useContext } from 'react';
import { GroceriesContext, GroceriesContextValue } from '../context/GroceriesContext';
import GroceryCard from './GroceryCard';

type GroceryListProps = {
  groceries: Grocery[];
};

const GroceryList = (props: GroceryListProps) => {
  const { total } = useContext(GroceriesContext) as GroceriesContextValue;
  const { groceries } = props;

  return (
    <div>
      {groceries.length === 0 ? (
        <p>Your grocery is empty...</p>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold">Total: {formatCurrency(total)}</p>
          {groceries.map((grocery) => (
            <GroceryCard key={grocery._id} grocery={grocery} />
          ))}
          <p className="text-3xl font-semibold">Total: {formatCurrency(total)}</p>
        </div>
      )}
    </div>
  );
};

export default GroceryList;
