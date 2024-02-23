import { Field } from "formik";

export const Select = ({ label, name, options }: Props) => {
  return (
    <div className="mb-2">
      <label htmlFor={name} className="block mb-1">
        {label}
      </label>
      <div className="relative">
        <Field
          id={name}
          name={name}
          as="select"
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          {options.map((option, index) => (
            <option key={`${index}_${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

interface Props {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}
