import { Link } from 'react-router-dom';

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  return (
    <header className="flex justify-between px-4 py-4 bg-slate-200 items-center">
      <h1 className="font-semibold text-lg">
        <Link to="/">Budgetarian</Link>
      </h1>
      <nav className="flex gap-2 text-sm">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

export default Header;
