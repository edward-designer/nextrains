import React, { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [localStoredValue, setLocalStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setNewValue = (value: T) => {
    try {
      setLocalStoredValue(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [localStoredValue, setNewValue];
}

export default useLocalStorage;
