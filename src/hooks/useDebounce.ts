import { useEffect, useState } from "react";

export function useDebounce<T>(value: T): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedValue;
}
