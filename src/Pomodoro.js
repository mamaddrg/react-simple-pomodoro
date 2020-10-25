import React, { useState } from 'react';
import './Pomodoro.css';

const DEFAULT_TIME = 15 * 60;
const MESSAGES = {
  default: `Let's start!`,
  running: `Talk less, Do more!`,
  stop: `You're gonna get it!`,
  reset: `Let's do it one more time!`
};
let timerId = 0;


const Pomodoro = () => {

  const [message, setMessage] = useState(MESSAGES.default);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [isRunning, setIsRunning] = useState(false);

  function startTimer() {

    if (isRunning) return;

    setMessage(MESSAGES.running);
    
    timerId = setInterval(() => 
      setTimeLeft((timeLeft) => {

        if (timeLeft >= 1) return timeLeft - 1;
        resetTimer();
      })
    , 1000);

    setIsRunning(true);
  }

  function stopTimer() {
    clearInterval(timerId);
    setIsRunning(false);
    setMessage(MESSAGES.stop);
  }

  function resetTimer() {
    clearInterval(timerId);
    setTimeLeft(DEFAULT_TIME);
    setIsRunning(false);
    setMessage(MESSAGES.reset);
  }

  function formatMinuteTime(time) {
    return time.toString().padStart(2, '0');
  }


  const minutes =Math.floor(timeLeft / 60);
  const seconds = formatMinuteTime(timeLeft - (minutes * 60));
  const progress = Math.floor((timeLeft / DEFAULT_TIME) * 100);

  return (
    <div className="pomodoro">
      <h3> {message} </h3>
      <div className="timer mt-large">
        { minutes }:{ seconds }
      </div>
      <div className="percentage mt-standard">
        { progress }%
        <div style={{width:`${progress}%`}} className="progress-bg"></div>
      </div>
      <div className="controls mt-large">
        <button onClick={ startTimer }>Start</button>
        <button onClick={ stopTimer }>Stop</button>
        <button onClick={ resetTimer }>Reset</button>
      </div>
    </div>
  );
}

export default Pomodoro;
