import { Button } from "../button";
import { PiSpinnerGapBold } from "react-icons/pi";

export const ViewBox = ({
  title,
  children,
  buttonText,
  onSubmit,
  loading,
  href,
}) => {
  return (
    <div className="flex flex-col gap-10 bg-zinc-900 p-4 rounded-lg border border-zinc-800 w-full max-w-lg relative">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-sm">
          <PiSpinnerGapBold className="animate-spin" size={24} />
        </div>
      )}
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
