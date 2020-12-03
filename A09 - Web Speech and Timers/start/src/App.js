import React from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useSpeechSynthesis } from 'react-speech-kit';
import './App.css';

const timersList = [
  { time: 2, text: 'this is my message' },
  { time: 5, text: 'helo' },
  { time: 8, text: 'whats up' },
];

export const TimerSlot = ({ index, timer, updateTimers }) => {
  const [time, setTime] = React.useState(timer.time);
  const [text, setText] = React.useState(timer.text);

  const handleBlur = () => {
    updateTimers(index, time, text);
  };

  return (
    <form className="timer" key={index}>
      <input
        type="number"
        value={time}
        onChange={(e) => setTime(Number(e.target.value))}
        onBlur={handleBlur}
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
      />
    </form>
  );
};

export default function App() {
  const [timers, setTimers] = React.useState(timersList);
  const { seconds, start, reset, isRunning } = useStopwatch();
  const { speak, speaking, supported, cancel } = useSpeechSynthesis();

  console.log(supported);

  const handleTimers = (index, time, text) => {
    const newTimers = [...timers];
    newTimers[index].time = time;
    newTimers[index].text = text;
    setTimers(newTimers);
  };

  const addTimer = () => {
    const newTimer = { time: 5, text: 'iam an Added one' };
    setTimers([...timers, newTimer]);
  };

  React.useEffect(() => {
    const foundTimer = timers.find((timer) => timer.time === seconds);

    if (foundTimer) {
      const text = foundTimer.text;
      speak({ text: text });
    }
    if (seconds > timers[timers.length - 1].time) reset();
  }, [seconds, timers]);

  if (!supported) {
    return <div>Your Browser is not supported. Sorry.</div>;
  }

  return (
    <div className="app">
      <h2>Talk the Talk</h2>

      <div className="timers">
        {timers.map((timer, index) => {
          return (
            <TimerSlot
              key={index}
              index={index}
              timer={timer}
              updateTimers={handleTimers}
            />
          );
        })}

        <button className="add-button" onClick={addTimer}>
          Add
        </button>
      </div>

      {/* seconds */}
      <h2>{seconds}</h2>

      {/* buttons */}
      <div className="buttons">
        {!isRunning && (
          <button className="start-button" onClick={start}>
            Start
          </button>
        )}
        {isRunning && (
          <button className="stop-button" onClick={reset}>
            Stop
          </button>
        )}

        {speaking ? <p>Iam Speaking..</p> : ''}
      </div>
    </div>
  );
}
