import React from "react";

type TButton = {
  clickHandler?: () => void;
  children: React.ReactNode;
  customStyle?: string;
  ariaLabel: string;
  label?: string;
  arrow?: React.ReactNode;
};

const Button = ({
  clickHandler = () => {},
  children,
  customStyle,
  ariaLabel,
  label = "",
  arrow,
}: TButton) => {
  return (
    <>
      <button
        className={`relative flex flex-col items-center justify-center w-12 h-12 md:w-10 md:h-10 rounded-full text-reverse-color m-1 ${customStyle}`}
        onClick={clickHandler}
        aria-label={ariaLabel}
      >
        {children}
        {label && <div className="text-[7px] leading-[1em]">{label}</div>}
      </button>
      {arrow}
    </>
  );
};

export default Button;
