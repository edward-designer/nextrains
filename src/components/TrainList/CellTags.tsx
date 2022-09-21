import React from "react";

import Tag from "./Tags";

interface TCellTags {
  fastest: boolean;
  isDirect: boolean;
  isSelected: boolean;
  changeStation: string;
}

const CellTags = ({
  fastest,
  isDirect,
  isSelected,
  changeStation,
}: TCellTags) => {
  if (!fastest && !isDirect) return null;
  return (
    <div className="-mt-1 -mb-4">
      {fastest && (
        <Tag className="z-20 bg-hover-color after:border-l-hover-color">
          Fastest
        </Tag>
      )}
      {isDirect && (
        <Tag className="z-10 bg-train-direct after:border-l-train-direct">
          Direct
        </Tag>
      )}
      {isSelected && isDirect && (
        <Tag className="w-[180px] z-1 bg-background-nochange after:border-l-background-nochange">
          No need to change at {changeStation}
        </Tag>
      )}
    </div>
  );
};

export default CellTags;
