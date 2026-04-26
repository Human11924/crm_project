import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

export default function SearchInput({ value: outerValue = "", onSearch }) {
  const [value, setValue] = useState(outerValue);
  const debouncedValue = useDebounce(value, 400);

  useEffect(() => {
    setValue(outerValue);
  }, [outerValue]);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search users..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
