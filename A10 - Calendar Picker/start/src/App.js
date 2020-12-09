import React from 'react';
import './App.css';

const calendarDates = Array(31)
  .fill(0)
  .map((e, i) => i);

export default function App() {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [dateType, setDateType] = React.useState('start');

  const handleDate = (day) => {
    if (startDate && startDate > endDate) {
      setStartDate(day);
      setDateType('end');
    }
    if (dateType === 'start') {
      setStartDate(day);
      setDateType('end');
      return;
    }
    if (dateType === 'end') {
      setEndDate(day);
    }
  };
  return (
    <>
      <div className="date-chooser">
        <button
          className="date-chooser-button"
          onClick={() => setDateType('start')}
        >
          Start Date <span>{startDate}</span>
        </button>
        <button
          className="date-chooser-button"
          onClick={() => setDateType('end')}
        >
          End Date <span>{endDate}</span>
        </button>
      </div>

      <div className="calendar">
        {calendarDates.map((day, index) => {
          return (
            <div
              className="calendar-day"
              key={index}
              onClick={() => handleDate(day + 1)}
            >
              {day + 1}
            </div>
          );
        })}
      </div>
    </>
  );
}
