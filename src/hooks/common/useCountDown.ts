import { useEffect, useRef, useState } from 'react'

export const useCountDown = (total: number, ms = 1000) => {
  const [counter, setCountDown] = useState(total)
  const intervalId = useRef<any>()

  const reset = () => {
    clearInterval(intervalId.current)
    setCountDown(total)
  }

  useEffect(() => {
    intervalId.current = setInterval(() => {
      if (counter > 0) {
        setCountDown((prevCounter) => prevCounter - 1)
      }
    }, ms)

    if (counter === 0) clearInterval(intervalId.current)

    return () => clearInterval(intervalId.current)
  }, [counter, ms])

  return {
    counter,
    reset
  }
}
