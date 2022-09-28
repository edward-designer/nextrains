import React, { useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";

import Button from "./Button";

interface TAlert {
  message: string;
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  type?: "Error" | "Notice";
}

const Alert = ({
  message,
  showAlert,
  setShowAlert,
  type = "Error",
}: TAlert) => {
  if (!message || !showAlert) return null;

  return (
    <div
      className={`flex justify-center items-center ${
        type === "Error" ? "bg-background-cancelled" : "bg-background-notice"
      }`}
      role="alert"
    >
      <div
        className={`flex-1 text-xs border-l-4 px-4 py-2 ${
          type === "Error"
            ? "border-text-highlight text-text-highlight"
            : "border-accent-color text-accent-color"
        }`}
      >
        <p className="font-bold">{type}</p>
        {type === "Error" ? (
          <p>{message}</p>
        ) : (
          <p dangerouslySetInnerHTML={{ __html: message }}></p>
        )}
      </div>
      <Button
        customStyle="bg-transparent"
        ariaLabel="close the message"
        clickHandler={() => setShowAlert(false)}
      >
        <ClearIcon />
      </Button>
    </div>
  );
};

export default Alert;
