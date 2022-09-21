import React from "react";

import RailwayAlertIcon from "@mui/icons-material/RailwayAlert";

interface TCellReason {
  reason: string | null;
}

const CellReason = ({ reason }: TCellReason) => {
  if (!reason) return null;
  return (
    <div className="flex items-center text-[7pt] -mt-3 leading-3 p-1 italic text-text-highlight">
      <RailwayAlertIcon className="text-text-highlight px-1" />
      <div>{reason}</div>
    </div>
  );
};

export default CellReason;
