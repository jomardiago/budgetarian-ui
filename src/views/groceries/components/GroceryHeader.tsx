import { GroceryItem } from '@/api/groceryItem/groceryItemApi';
import { formatCurrency } from '@/helpers/currency-utils';
import { getTotal } from '../helpers/grocery-utils';

type GroceryHeaderProps = {
  groceries: GroceryItem[];
};

const GroceryHeader = (props: GroceryHeaderProps) => {
  const total = getTotal(props.groceries);

  return (
    <div className="flex text-center justify-around my-4">
      <p className="text-base font-semibold">Budget: {formatCurrency(3000)}</p>
      <p className="text-base font-semibold">Total: {formatCurrency(total)}</p>
      <p className="text-base font-semibold text-red-500">Budget Left: {formatCurrency(3000 - total)}</p>
    </div>
  );
};

export default GroceryHeader;
