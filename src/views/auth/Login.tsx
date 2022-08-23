import { loginUser } from '@/api/auth/authApi';
import Input from '@/components/Input';
import { AuthContext } from '@/context/AuthContext';
import { toastConfig } from '@/helpers/toast-utils';
import React, { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type LoginProps = {};

const Login = (props: LoginProps) => {
  const loginUserMutation = useMutation(loginUser);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginUserMutation.mutate(loginForm, {
      onSuccess: (response) => {
        localStorage.setItem('token', response.data.token);
        login(() => navigate('/'));
      },
      onError: (error: any) => {
        toast.error(error.response.data.message, toastConfig);
      },
    });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((loginForm) => ({
      ...loginForm,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="w-[90%] m-auto mt-8 bg-slate-600 p-2 rounded-md">
      <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
        <div className="flex flex-col gap-2">
          <Input type="text" id="username" name="username" label="Username" value={loginForm.username} onChange={handleOnChange} required />
        </div>
        <div className="flex flex-col gap-2">
          <Input type="password" id="password" name="password" label="Password" value={loginForm.password} onChange={handleOnChange} required />
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
