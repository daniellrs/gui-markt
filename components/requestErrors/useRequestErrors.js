import { useState } from "react";

export const useRequestErrors = () => {
  const [errors, setErrors] = useState([]);

  const verifyErrors = (error) => {
    const data = error?.response?.data;
    if (!data) return;

    if (Array.isArray(data)) {
      setErrors(data.map((d) => `${d.campo}: ${d.erro}`));
    } else {
      setErrors([data.erro]);
    }
  };

  const clearErrors = () => setErrors([]);

  return { errors, verifyErrors, clearErrors };
};
