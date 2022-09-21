import React from "react";

import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { TrainStatus } from "../../Types/types";

type TCellPlatform = {
  platform?: string | null;
  status: TrainStatus;
  toPlatform?: string | null;
  isConnecting?: boolean;
};
const CellPlatform = ({
  platform = "",
  status,
  toPlatform = null,
  isConnecting = false,
}: TCellPlatform) => {
  if (status === TrainStatus.cancelled || status === TrainStatus.delayed)
    return null;

  if (toPlatform === null && !platform && isConnecting) platform = "TBC";

  return (
    <div
      className={`basis-1/4 flex flex-col items-center p-2 ${
        platform || toPlatform
          ? status === TrainStatus.departed
            ? "bg-background-inactive text-text-inactive"
            : platform
            ? isConnecting
              ? "bg-accent-color text-reverse-color z-10"
              : "bg-accent-color text-reverse-color"
            : "bg-hover-color text-reverse-color -translate-x-[3px] translate-y-1 opacity-70 scale-50"
          : toPlatform !== null
          ? "bg-transparent text-text-inactive scale-75 -translate-x-3 -translate-y-2"
          : "bg-transparent text-text-inactive scale-x-80"
      }`}
    >
      {toPlatform || platform ? (
        <>
          <span className="text-[9px] text-center leading-3">Platform</span>
          <span className="text-2xl text-center leading-6">
            {toPlatform || platform}
          </span>
        </>
      ) : (
        <HourglassEmptyIcon />
      )}
    </div>
  );
};

export default CellPlatform;
