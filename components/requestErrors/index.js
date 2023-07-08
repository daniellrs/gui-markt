import { IoWarningOutline } from "react-icons/io5";

export const RequestErrors = ({ errors, className }) => {
  if (!errors?.length) return null;

  return (
    <ul className={`${className} text-red-400`}>
      {errors.map((error, index) => (
        <li key={index} className="flex gap-2 items-center">
          <IoWarningOutline />
          {error}
        </li>
      ))}
    </ul>
  );
};
