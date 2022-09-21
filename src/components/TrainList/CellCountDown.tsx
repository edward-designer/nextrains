import React from "react";
import ReactTimeAgo from "react-time-ago";

const { round } = require("javascript-time-ago/steps");

type TCellCountDown = {
  departureDateObj: Date | undefined;
  isRunning: boolean;
};

const CellCountDown = ({ departureDateObj, isRunning }: TCellCountDown) => {
  return (
    <div className="basis-1/4 flex relative items-center justify-center">
      {isRunning && (
        <span
          data-testid="ping"
          className="animate-ping absolute w-6 h-6 rounded-full bg-background-countdown opacity-50"
        ></span>
      )}
      {departureDateObj && (
        <ReactTimeAgo
          className={`absolute w-8 h-8 bg-background-countdown opacity-80 rounded-full text-[9px] text-center leading-8 text-text-countdown ${
            !isRunning ? "text-text-inactive bg-background-inactive" : ""
          }`}
          timeStyle={{ labels: ["custom", "mini"], steps: round }}
          locale="en"
          date={departureDateObj}
          future
        />
      )}
    </div>
  );
};

export default CellCountDown;
