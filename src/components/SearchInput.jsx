import { useState, useEffect } from "react"
import { useDebounce } from "../hooks/useDebounce"

export default function SearchInput({ onSearch }) {
  const [value, setValue] = useState("")
  const debouncedValue = useDebounce(value, 400)

  useEffect(() => {
    onSearch(debouncedValue)
  }, [debouncedValue, onSearch])

  return (
    <input
      type="text"
      placeholder="Поиск..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
