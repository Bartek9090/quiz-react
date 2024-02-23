import { InputHTMLAttributes } from "react";
import { Field } from "formik";

export const Input = ({ label, name, ...props }: Props) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-white  mb-1">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        className="appearance-none border text-black rounded-md w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline"
        type={props.type || "text"}
        {...props}
      />
    </div>
  );
};

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}
