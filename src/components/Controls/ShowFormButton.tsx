import React from "react";

import Button from "../Common/Button";

import ExpandIcon from "@mui/icons-material/Expand";
import VerticalAlignCenterIcon from "@mui/icons-material/VerticalAlignCenter";

interface TShowFormButton {
  expandForm: boolean;
  setExpandForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowFormButton = ({ expandForm, setExpandForm }: TShowFormButton) => {
  const showFormHandler = () => {
    setExpandForm((expandForm) => !expandForm);
  };
  return (
    <>
      {expandForm ? (
        <Button
          clickHandler={showFormHandler}
          ariaLabel="Minimize the stations input form"
          customStyle="bg-transparent text-button-color"
          label="Minimize"
        >
          <VerticalAlignCenterIcon />
        </Button>
      ) : (
        <Button
          clickHandler={showFormHandler}
          ariaLabel="Open the stations input form to edit"
          customStyle="bg-transparent text-button-color"
          label="Edit"
        >
          <ExpandIcon />
        </Button>
      )}
    </>
  );
};

export default ShowFormButton;
