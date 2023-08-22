import {
  ArrowPathIcon,
  ArrowUpTrayIcon,
  ClockIcon,
  PauseIcon,
  PlayIcon,
} from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

const Timer = () => {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timer

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning])

  const handleStart = () => {
    setIsRunning(true)
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setElapsedTime(0)
  }

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, '0')
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, '0')
    const seconds = (time % 60).toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <div
      className="flex justify-between items-center max-w-xl"
      data-testid="timer"
    >
      <ClockIcon className="w-6 h-6" />{' '}
      <span className="text-lg md:text-3xl">{formatTime(elapsedTime)}</span>
      <div className="flex gap-4">
        {isRunning ? (
          <button onClick={handleStop}>
            <PauseIcon className="w-6 h-6" />
          </button>
        ) : (
          <button onClick={handleStart}>
            <PlayIcon className="w-6 h-6" />
          </button>
        )}
        <button onClick={handleReset}>
          <ArrowPathIcon className="w-6 h-6" />
        </button>
        <button>
          <ArrowUpTrayIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default Timer
