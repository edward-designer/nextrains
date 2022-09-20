import React from "react";

type TButton = {
  clickHandler: () => void;
  children: React.ReactNode;
  customStyle?: string;
  ariaLabel: string;
  label?: string;
};

const Button = ({
  clickHandler,
  children,
  customStyle,
  ariaLabel,
  label = "",
}: TButton) => {
  return (
    <button
      className={`relative flex flex-col items-center justify-center w-10 h-10 md:w-8 md:h-8 rounded-full text-reverse-color m-1 ${customStyle}`}
      onClick={clickHandler}
      aria-label={ariaLabel}
    >
      {children}
      {label && <div className="text-[6px] leading-[1em]">{label}</div>}
    </button>
  );
};

export default Button;
