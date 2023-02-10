import React, { useEffect, useState } from "react";

const useLocalStorage = <T>(
  key: string,
  initialValue?: T | undefined | (() => T | undefined)
) => {
  const [value, setValue] = useState<T | undefined>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof initialValue === "function")
        return (initialValue as () => T | undefined)();
      return initialValue;
    }
    return JSON.parse(jsonValue);
  });

  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T | undefined, typeof setValue];
};

export default useLocalStorage;
