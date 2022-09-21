import CellPlatform from "./CellPlatform";
import CellCountDown from "./CellCountDown";
import CellChangeTimer from "./CellChangeTimer";

import { TrainStatus } from "../../types/customTypes";

type TCellPlatformTimerContainer = {
  status: TrainStatus;
  platform: string;
  isConnecting: boolean;
  toPlatform: string;
  changeTime: string | null;
  arrivalTime: string | null;
  isRunning: boolean;
};
const CellPlatformTimerContainer = ({
  status,
  platform,
  isConnecting,
  toPlatform,
  changeTime,
  arrivalTime,
  isRunning,
}: TCellPlatformTimerContainer) => {
  const isDirect = platform === toPlatform;
  return (
    <div
      className={`flex flex-row justify-center ${
        isRunning || status === TrainStatus.departed
          ? "basis-3/12 "
          : "basis-1/12 "
      }`}
    >
      {isConnecting ? (
        isDirect ? (
          <div className="flex flex-col">
            <CellPlatform status={status} platform={platform} />
            <CellChangeTimer changeTime={changeTime} samePlatform={true} />
          </div>
        ) : (
          <>
            <CellPlatform status={status} toPlatform={toPlatform} />
            <CellChangeTimer changeTime={changeTime} />
            <CellPlatform
              status={status}
              platform={platform}
              isConnecting={isConnecting}
            />
          </>
        )
      ) : (
        <>
          <CellPlatform status={status} platform={platform} />
          <CellCountDown arrivalTime={arrivalTime} isRunning={isRunning} />
        </>
      )}
    </div>
  );
};

export default CellPlatformTimerContainer;
