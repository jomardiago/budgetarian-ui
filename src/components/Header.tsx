import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type HeaderProps = {};

const Header = (props: HeaderProps) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex justify-between px-4 py-4 bg-slate-200 items-center">
      <h1 className="font-semibold text-lg">
        <Link to="/">Budgetarian</Link>
      </h1>
      <nav className="flex gap-2 text-sm">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={onLogout}>Logout</button>
        )}
      </nav>
    </header>
  );
};

export default Header;
