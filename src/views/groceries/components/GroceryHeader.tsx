import { GroceryItem } from '@/api/groceryItem/groceryItemApi';
import { formatCurrency } from '@/helpers/currency-utils';
import { getTotal } from '../helpers/grocery-utils';

type GroceryHeaderProps = {
  groceries: GroceryItem[];
};

const GroceryHeader = (props: GroceryHeaderProps) => {
  const total = getTotal(props.groceries);

  const getBudgetLeftClass = () => {
    if ((3000 - total) < (3000 * .20)) {
      return 'text-base font-semibold text-red-400';
    } else if ((3000 - total) < (3000 * .60)) {
      return 'text-base font-semibold text-orange-400';
    } else {
      return 'text-base font-semibold';
    }
  };

  return (
    <div className="flex text-center justify-around my-4 gap-4 text-white">
      <p className="text-base font-semibold">Budget: {formatCurrency(3000)}</p>
      <p className="text-base font-semibold">Total: {formatCurrency(total)}</p>
      <p className={getBudgetLeftClass()}>Budget Left: {formatCurrency(3000 - total)}</p>
    </div>
  );
};

export default GroceryHeader;
