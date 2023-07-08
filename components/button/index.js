import classNames from "classnames";
import { PiSpinnerGapBold } from "react-icons/pi";

export const Button = ({
  href,
  size = "md",
  full,
  onClick,
  loading,
  children,
}) => {
  const Component = href ? "a" : "button";

  return (
    <Component
      className={classNames(
        "flex justify-center items-center rounded-lg border transition-colors border-neutral-700 bg-neutral-800/30 hover:border-neutral-600 hover:bg-neutral-700/30 active:scale-95",
        {
          ["px-3 py-2"]: size === "sm",
          ["px-5 py-4"]: size === "md",
          ["w-full"]: full,
          ["animate-pulse opacity-50"]: loading,
        }
      )}
      href={href}
      rel="noopener noreferrer"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <PiSpinnerGapBold className="animate-spin" size={24} />
      ) : (
        children
      )}
    </Component>
  );
};
