import { formatCurrency } from '@/helpers/currency-utils';
import { useContext } from 'react';
import { GroceriesContext, GroceriesContextValue } from '../context/GroceriesContext';

type GroceryHeaderProps = {};

const GroceryHeader = (props: GroceryHeaderProps) => {
  const { total } = useContext(GroceriesContext) as GroceriesContextValue;

  return (
    <div className="flex justify-between my-4">
      <p className="text-2xl font-semibold">Budget: {formatCurrency(3000)}</p>
      <p className="text-2xl font-semibold text-red-500">Remaining Budget: {formatCurrency(3000 - total)}</p>
    </div>
  );
};

export default GroceryHeader;
