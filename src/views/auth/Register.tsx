import Input from '@/components/Input';

type RegisterProps = {};

const Register = (props: RegisterProps) => {
  return (
    <div className="w-[90%] m-auto mt-8 bg-slate-600 p-2 rounded-md">
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input type="email" id="email" name="email" label="Email" required />
        </div>
        <div className="flex flex-col gap-2">
          <Input type="text" id="username" name="username" label="Username" required />
        </div>
        <div className="flex flex-col gap-2">
          <Input type="password" id="password" name="password" label="Password" required />
        </div>
        <div className="flex flex-col gap-2">
          <Input type="password" id="confirmPassword" name="confirmPassword" label="Confirm Password" required />
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
