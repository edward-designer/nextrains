import React, { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import useLocalStorage from "../../hooks/useLocalStorage";

enum Theme {
  light = "light",
  dark = "dark",
}

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const [localStoredValue, setNewValue] = useLocalStorage<Theme>(
    "theme",
    Theme.light
  );
  const changeTheme = () => {
    localStoredValue === Theme.dark
      ? setNewValue(Theme.light)
      : setNewValue(Theme.dark);
  };

  const MUItheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: localStoredValue,
        },
      }),
    [localStoredValue]
  );

  return (
    <div
      data-theme={localStoredValue}
      className="relative min-h-screen pt-2 bg-background-main text-text-primary"
      data-testid="wrapper"
    >
      <div
        onChange={changeTheme}
        className="absolute top-0 right-1 flex items-center justify-end p-2 gap-1 text-lg z-50"
      >
        <span>
          <WbSunnyOutlinedIcon
            sx={{ fontSize: "medium", color: "var(--text-tertiary)" }}
          />
        </span>
        <label className="inline-block h-6 relative w-10" htmlFor="checkbox">
          <input
            className="peer translate-x-[100%] focus:z-50 focus:outline-none"
            type="checkbox"
            id="checkbox"
            defaultChecked={localStoredValue === Theme.dark}
            aria-label="toggle light and dark theme"
          />
          <div
            role="presentation"
            className="absolute rounded-full bg-slate-300 top-0 right-0 bottom-0 left-0 cursor-pointer transition-all duration:500
          before:absolute before:content-[''] before:h-5 before:w-5 before:bg-reverse-color before:rounded-full before:bottom-[2px] before:left-1 before:transition-all before:duration-500 
          peer-checked:bg-slate-700 peer-checked:before:translate-x-4 peer-focus-visible:ring peer-focus-visible:ring-focus-color"
          ></div>
        </label>
        <span>
          <DarkModeOutlinedIcon
            sx={{ fontSize: "medium", color: "var(--text-tertiary)" }}
          />
        </span>
      </div>
      <ThemeProvider theme={MUItheme}>{children}</ThemeProvider>
    </div>
  );
};

export default React.memo(ThemeWrapper);
