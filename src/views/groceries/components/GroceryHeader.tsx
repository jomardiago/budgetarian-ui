import { GroceryItem } from '@/api/groceryItem/groceryItemApi';
import { formatCurrency } from '@/helpers/currency-utils';
import { getTotal } from '../helpers/grocery-utils';

type GroceryHeaderProps = {
  groceries: GroceryItem[];
};

const GroceryHeader = (props: GroceryHeaderProps) => {
  const total = getTotal(props.groceries);

  return (
    <div className="flex justify-between my-4">
      <p className="text-2xl font-semibold">Budget: {formatCurrency(3000)}</p>
      <p className="text-2xl font-semibold text-red-500">Budget Left: {formatCurrency(3000 - total)}</p>
    </div>
  );
};

export default GroceryHeader;
