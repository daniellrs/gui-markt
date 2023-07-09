import classNames from "classnames";
import { PiSpinnerGapBold } from "react-icons/pi";

export const Button = ({
  href,
  size = "md",
  full,
  onClick,
  loading,
  disabled,
  children,
  className,
}) => {
  const Component = href ? "a" : "button";

  return (
    <Component
      className={classNames(
        className,
        "flex justify-center items-center rounded-lg border transition-colors border-neutral-700 bg-neutral-800/30",
        {
          ["px-2 py-1"]: size === "xs",
          ["px-3 py-2"]: size === "sm",
          ["px-5 py-4"]: size === "md",
          ["w-full"]: full,
          ["hover:border-neutral-600 hover:bg-neutral-700/30 active:scale-95"]:
            !loading && !disabled,
          ["animate-pulse opacity-50"]: loading,
          ["opacity-50"]: disabled,
        }
      )}
      href={href}
      rel="noopener noreferrer"
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? (
        <PiSpinnerGapBold className="animate-spin" size={24} />
      ) : (
        children
      )}
    </Component>
  );
};
