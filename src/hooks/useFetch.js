import { useState, useEffect } from "react"

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    let isMounted = true

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(url, options)

        if (!res.ok) {
          throw new Error("Ошибка запроса")
        }

        const result = await res.json()

        if (isMounted) {
          setData(result)
        }

      } catch (err) {
        if (isMounted) {
          setError(err.message)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [url])

  return { data, loading, error }
}
