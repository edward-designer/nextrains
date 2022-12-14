import React from "react";

type TTag = {
  children: React.ReactNode;
  className: string;
};

const Tag = ({ children, className }: TTag) => {
  return (
    <span
      className={`inline-block text-xs min-w-16 h-[20px] relative text-reverse-color pl-4 py-[3px] ${className} 
        after:absolute after:left-[100%] after:top-0 after:w-0 after:h-0 after:border-t-[10px] after:border-t-transparent after:border-l-[10px] after:border-b-[10px] after:border-b-transparent
        `}
    >
      {children}
    </span>
  );
};

export default Tag;
