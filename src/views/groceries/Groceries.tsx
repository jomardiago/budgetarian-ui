import { fetchGroceries, GroceryItem } from '@/api/groceryItem/groceryItemApi';
import { useQuery } from 'react-query';
import GroceryForm from './components/GroceryForm';
import GroceryHeader from './components/GroceryHeader';
import GroceryList from './components/GroceryList';
import GroceriesContextProvider from './context/GroceriesContext';

type GroceriesProps = {};

const Groceries = (props: GroceriesProps) => {
  const { data: groceries = [] } = useQuery<GroceryItem[]>('grocery-items', () => fetchGroceries());

  return (
    <GroceriesContextProvider>
      <GroceryHeader groceries={groceries} />
      <div className="flex flex-col gap-8">
        <div>
          <GroceryForm />
        </div>
        <div>
          <GroceryList groceries={groceries} />
        </div>
      </div>
    </GroceriesContextProvider>
  );
};

export default Groceries;
