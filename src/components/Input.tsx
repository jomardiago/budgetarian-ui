import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const Input = (props: InputProps) => {
  const { label, inputRef, ...rest } = props;

  return (
    <>
      <label htmlFor={rest.name} className="text-sm text-white">
        {label}
      </label>
      <input {...rest} ref={inputRef} />
    </>
  );
};

export default Input;
