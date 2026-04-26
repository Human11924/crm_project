import { useState, useEffect } from "react"

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(url, options)

        if (!res.ok) {
          throw new Error("Ошибка запроса")
        }

        const result = await res.json()
        setData(result)

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}
