import Button from "../Common/Button";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

interface TAddStationButton {
  changeCount: number;
  addHandler: () => void;
}

const AddStationButton = ({ changeCount, addHandler }: TAddStationButton) => {
  if (changeCount > 3) return null;
  return (
    <div className="flex flex-row items-center justify-center -mt-5 -mb-5 z-10 md:mt-0 md:mb-0">
      <Button
        customStyle="place-self-center bg-button-color"
        clickHandler={addHandler}
        ariaLabel="Add a Change Station"
        arrow={
          <DoubleArrowIcon
            sx={{
              fontSize: "small",
              color: "var(--text-tertiary)",
              marginLeft: "10px",
              marginRight: "-8px",
            }}
          />
        }
      >
        <AddOutlinedIcon />
      </Button>
    </div>
  );
};

export default AddStationButton;
