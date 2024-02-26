import { useEffect, useState } from 'react'

export const useCountDown = (total: number, ms = 1000) => {
  const [counter, setCountDown] = useState(total)

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter > 0) {
        setCountDown((prevCounter) => prevCounter - 1)
      }
    }, ms)

    if (counter === 0) clearInterval(interval)

    return () => clearInterval(interval)
  }, [counter, ms])

  return {
    counter
  }
}
