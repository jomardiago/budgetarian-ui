import GroceryForm from './components/GroceryForm';
import GroceryHeader from './components/GroceryHeader';
import GroceryList from './components/GroceryList';
import GroceriesContextProvider from './context/GroceriesContext';

export type Grocery = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
};

type GroceriesProps = {};

const Groceries = (props: GroceriesProps) => {
  return (
    <GroceriesContextProvider>
      <GroceryHeader />
      <div className="flex flex-col gap-8">
        <div>
          <GroceryForm />
        </div>
        <div>
          <GroceryList />
        </div>
      </div>
    </GroceriesContextProvider>
  );
};

export default Groceries;
