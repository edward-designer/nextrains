import React from "react";

import { countDownTimer } from "../../Utils/helpers";

interface TCellCountDown {
  arrivalTime: string | null;
  isRunning: boolean;
}

const CellCountDown = ({ arrivalTime, isRunning }: TCellCountDown) => {
  if (!isRunning || arrivalTime === null) return null;
  return (
    <div className="basis-1/4 flex relative items-center justify-center">
      <span
        data-testid="ping"
        className="animate-ping absolute w-6 h-6 rounded-full bg-background-countdown opacity-50"
      ></span>
      <div
        className={`absolute w-8 h-8 bg-background-countdown opacity-80 rounded-full text-[9px] text-center leading-8 text-text-countdown ${
          !isRunning ? "text-text-inactive bg-background-inactive" : ""
        }`}
      >
        {countDownTimer(arrivalTime)}
      </div>
    </div>
  );
};

export default CellCountDown;
