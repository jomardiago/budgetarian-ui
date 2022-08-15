import { useContext } from 'react';
import { GroceriesContext, GroceriesContextValue } from '../context/GroceriesContext';
import GroceryCard from './GroceryCard';

type GroceryListProps = {};

const GroceryList = (props: GroceryListProps) => {
  const { groceries, total } = useContext(GroceriesContext) as GroceriesContextValue;

  return (
    <div>
      {groceries.length === 0 ? (
        <p>Your grocery is empty...</p>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-xl font-semibold">Total: {total}</p>
          {groceries.map((grocery) => (
            <GroceryCard key={grocery.id} grocery={grocery} />
          ))}
          <p className="text-3xl font-semibold">Total: {total}</p>
        </div>
      )}
    </div>
  );
};

export default GroceryList;
