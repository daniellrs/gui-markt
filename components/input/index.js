export const Input = ({
  label,
  value,
  onChange,
  type,
  className,
  max,
  placeholder,
}) => {
  return (
    <label className={`${className} flex flex-col gap-2`}>
      <span className="text-sm">{label}</span>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-zinc-700 p-4 rounded-lg outline-transparent"
        type={type}
        max={max}
      />
    </label>
  );
};
