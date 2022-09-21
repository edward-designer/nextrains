import React from "react";
import AlarmIcon from "@mui/icons-material/Alarm";

type TCellChangeTimer = {
  changeTime: string | null;
  samePlatform?: boolean;
};

const CellChangeTimer = ({
  changeTime,
  samePlatform = false,
}: TCellChangeTimer) => {
  return (
    <>
      {changeTime && !samePlatform ? (
        <div className="scale-110 flex relative items-center justify-center -translate-x-5 translate-y-6 -mr-5 z-20">
          <div
            className="absolute w-10 h-4 bg-hover-color text-[9px] text-center leading-4 text-reverse-color
         after:border-l-hover-color after:absolute after:left-[100%] after:top-0 after:w-0 after:h-0 after:border-t-8 after:border-l-6 after:border-b-8 after:border-t-transparent after:border-b-transparent"
          >
            <AlarmIcon sx={{ fontSize: "10px", marginRight: "2px" }} />
            {changeTime}
          </div>
        </div>
      ) : (
        changeTime !== "0m" && (
          <div className="-mt-1 w-13 h-4 bg-hover-color text-[9px] text-center leading-4 text-reverse-color">
            <AlarmIcon sx={{ fontSize: "10px", marginRight: "2px" }} />
            {changeTime}
          </div>
        )
      )}
    </>
  );
};

export default CellChangeTimer;
