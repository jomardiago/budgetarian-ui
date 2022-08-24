import { fetchGroceries, GroceryItem } from '@/api/groceryItem/groceryItemApi';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import { AuthContext } from '@/context/AuthContext';
import { useContext, useRef } from 'react';
import { useQuery } from 'react-query';
import GroceryForm from './components/GroceryForm';
import GroceryHeader from './components/GroceryHeader';
import GroceryList from './components/GroceryList';
import GroceriesContextProvider from './context/GroceriesContext';

type GroceriesProps = {};

const Groceries = (props: GroceriesProps) => {
  const { user } = useContext(AuthContext);
  const { data: groceries = [], isLoading } = useQuery<GroceryItem[]>(`grocery-items-${user?._id}`, () => fetchGroceries());
  const formDivRef = useRef<HTMLDivElement>(null);

  return (
    <GroceriesContextProvider>
      <Layout>
        <div ref={formDivRef}></div>
        <GroceryHeader groceries={groceries} />
        <div className="flex flex-col gap-8">
          <div>
            <GroceryForm />
          </div>
          <div>{isLoading ? <Loading /> : <GroceryList groceries={groceries} formDivRef={formDivRef} />}</div>
        </div>
      </Layout>
    </GroceriesContextProvider>
  );
};

export default Groceries;
