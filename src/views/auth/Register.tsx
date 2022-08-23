import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import Input from '@/components/Input';
import { toastConfig } from '@/helpers/toast-utils';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { registerUser } from '@/api/auth/authApi';

type RegisterProps = {};

const Register = (props: RegisterProps) => {
  const registerUserMutation = useMutation(registerUser);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [registerForm, setRegisterForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, username, password, confirmPassword } = registerForm;

    if (password !== confirmPassword) {
      toast.warn('Passwords do not match...', toastConfig);
    } else {
      await registerUserMutation.mutate(
        { email, username, password },
        {
          onSuccess: (response) => {
            localStorage.setItem('token', response.data.token);
            login(() => navigate('/'));
          },
          onError: (error: any) => {
            toast.error(error.response.data.message, toastConfig);
          },
        }
      );
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((registerForm) => ({
      ...registerForm,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="w-[90%] m-auto mt-8 bg-slate-600 p-2 rounded-md">
      <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
        <div className="flex flex-col gap-2">
          <Input type="email" id="email" name="email" label="Email" value={registerForm.email} onChange={handleOnChange} required />
        </div>
        <div className="flex flex-col gap-2">
          <Input type="text" id="username" name="username" label="Username" value={registerForm.username} onChange={handleOnChange} required />
        </div>
        <div className="flex flex-col gap-2">
          <Input type="password" id="password" name="password" label="Password" value={registerForm.password} onChange={handleOnChange} required />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            value={registerForm.confirmPassword}
            onChange={handleOnChange}
            required
          />
        </div>
        <div>
          <button type="submit" className="px-6 py-2 bg-orange-300 text-white rounded-md w-full">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
