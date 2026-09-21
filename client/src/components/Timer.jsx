import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Timer({ timeLeft, totalTime }) {

  const percentage = (timeLeft / totalTime) * 100

  return (
    <div className='w-20 h-20'>

      <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}

        styles={buildStyles({
          textSize: "28px",

          pathColor:
            timeLeft <= 10
              ? "#ef4444"
              : "#8b5cf6",

          textColor:
            timeLeft <= 10
              ? "#f87171"
              : "#c4b5fd",

          trailColor: "#252b40",

          backgroundColor: "#111827",
        })}
      />

    </div>
  )
}

export default Timer