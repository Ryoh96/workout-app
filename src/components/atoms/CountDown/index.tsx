import { BellAlertIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  initialTime: number
}

const Countdown = ({ initialTime }: Props) => {
  const [time, setTime] = useState(initialTime)
  const [isOver, setIsOver] = useState(false)

  let timerSoundId = useRef<NodeJS.Timer | undefined>(undefined)
  let countDownSoundId = useRef<NodeJS.Timer | undefined>(undefined)
  let threeTimesCountId = useRef<NodeJS.Timer | undefined>(undefined)

  useEffect(() => {
    startAlarm(initialTime * 1000)
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval)
          setIsOver(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => {
      clearInterval(interval)
      timerSoundId && clearTimeout(timerSoundId.current)
      countDownSoundId && clearTimeout(countDownSoundId.current)
      threeTimesCountId && clearInterval(threeTimesCountId.current)
    }
  }, [initialTime])

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${padZero(minutes)}:${padZero(remainingSeconds)}`
  }

  const padZero = (value: number): string => {
    return value.toString().padStart(2, '0')
  }

  const startAlarm = (duration: number) => {
    const audioContext = new window.AudioContext()

    timerSoundId.current = setTimeout(() => {
      const oscillator = audioContext.createOscillator()
      oscillator.type = 'sine'
      oscillator.frequency.value = 880 // 1オクターブ上の音（440Hzの2倍）
      oscillator.connect(audioContext.destination)
      oscillator.start()

      setTimeout(() => {
        oscillator.stop()
      }, 3000) // 1オクターブ上の音を1秒間鳴らす
    }, duration) // 残り1秒になる時間

    if (initialTime > 3) {
      countDownSoundId.current = setTimeout(() => {
        let count = 3
        threeTimesCountId.current = setInterval(() => {
          const oscillator2 = audioContext.createOscillator()
          oscillator2.type = 'sine'
          oscillator2.frequency.value = 440 // 440Hzの音
          oscillator2.connect(audioContext.destination)
          oscillator2.start()

          setTimeout(() => {
            oscillator2.stop()
          }, 300)
          count--
          if (count <= 0) clearInterval(threeTimesCountId.current)
        }, 1000)
      }, duration - 4000)
    }
  }

  return (
    <div className="flex items-start relative">
      <span className="absolute flex">
        <BellAlertIcon
          className={`absolute h-6 w-6 ${isOver && 'text-red-500'}`}
        />
        {isOver && (
          <BellAlertIcon className="h-6 w-6 text-red-500 animate-ping absolute" />
        )}
      </span>
      <div className="ml-10">{formatTime(time)}</div>
    </div>
  )
}

export default Countdown
