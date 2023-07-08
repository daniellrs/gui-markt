import { Button } from "../button";

export const ViewBox = ({
  title,
  children,
  buttonText,
  onSubmit,
  loading,
  href,
}) => {
  return (
    <div className="flex flex-col gap-10 bg-zinc-900 p-4 rounded-lg border border-zinc-800 w-full max-w-lg">
      <h2 className="text-center font-bold text-lg">{title}</h2>
      <div>{children}</div>
      {buttonText && (
        <Button onClick={onSubmit} full loading={loading} href={href}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};
