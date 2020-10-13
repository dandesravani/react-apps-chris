import React from 'react';
import './App.css';

export default function App() {
  const [time, setTime] = React.useState(25 * 60);
  const [title, setTitle] = React.useState('Let the countdown begin!!');
  const [isRunning, setIsRunning] = React.useState(false);
  const intervalRef = React.useRef(null);

  const handleStartClick = () => {
    if (intervalRef.current !== null) {
      return;
    }
    setTitle('you are doing great!');
    intervalRef.current = setInterval(() => {
      setTime((time) => {
        if (time >= 1) {
          return time - 1;
        }
        handleTimeReset();
      });
    }, 1000);
    setIsRunning(!isRunning);
  };

  const handleStopClick = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle("don't stop, never give up!");
    setIsRunning(!isRunning);
  };

  const handleTimeReset = () => {
    clearInterval(intervalRef.current);
    setTitle('Ready to go for another round');
    intervalRef.current = null;
    setTime(25 * 60);
    setIsRunning(!isRunning);
  };

  const minutes = Math.floor(time / 60);
  const seconds = (time - minutes * 60).toString().padStart(2, '0');

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={handleStartClick}>Start</button>}
        {isRunning && <button onClick={handleStopClick}>Stop</button>}
        <button onClick={handleTimeReset}>Reset</button>
      </div>
    </div>
  );
}
