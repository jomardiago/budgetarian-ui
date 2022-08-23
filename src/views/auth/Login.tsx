import Input from '@/components/Input';
import { AuthContext } from '@/context/AuthContext';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

type LoginProps = {};

const Login = (props: LoginProps) => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dummyUser = {
      _id: '1',
      username: 'jomardiago',
    };

    setUser(dummyUser);

    localStorage.setItem('user', JSON.stringify(dummyUser));

    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  return (
    <div className="w-[90%] m-auto mt-8 bg-slate-600 p-2 rounded-md">
      <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
        <div className="flex flex-col gap-2">
          <Input type="text" id="username" name="username" label="Username" required />
        </div>
        <div className="flex flex-col gap-2">
          <Input type="password" id="password" name="password" label="Password" required />
        </div>
        <div>
          <button type="submit" className="px-6 py-2 bg-orange-300 text-white rounded-md w-full">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
