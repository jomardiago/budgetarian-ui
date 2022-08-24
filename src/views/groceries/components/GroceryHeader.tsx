import { GroceryItem } from '@/api/groceryItem/groceryItemApi';
import { AuthContext } from "@/context/AuthContext";
import { formatCurrency } from '@/helpers/currency-utils';
import { useContext } from "react";
import { getTotal } from '../helpers/grocery-utils';

type GroceryHeaderProps = {
  groceries: GroceryItem[];
};

const GroceryHeader = (props: GroceryHeaderProps) => {
  const { user } = useContext(AuthContext);
  const total = getTotal(props.groceries);

  const getBudgetLeftClass = () => {
    if (3000 - total < 3000 * 0.2) {
      return 'text-base font-semibold text-red-400';
    } else if (3000 - total < 3000 * 0.6) {
      return 'text-base font-semibold text-orange-400';
    } else {
      return 'text-base font-semibold';
    }
  };

  return (
    <div>
      <div className="text-white text-center my-4">
        <p className="text-xl">Hi { user?.username } 👋</p>
      </div>
      <div className="flex text-center justify-around my-4 gap-4 text-white">
        <p className="text-base font-semibold">Budget: {formatCurrency(3000)}</p>
        <p className="text-base font-semibold">Total: {formatCurrency(total)}</p>
        <p className={getBudgetLeftClass()}>Budget Left: {formatCurrency(3000 - total)}</p>
      </div>
    </div>
  );
};

export default GroceryHeader;
