import React from 'react';
import './App.css';
import Geocode from 'react-geocode';
import { Bar } from 'react-chartjs-2';

// openweathermap.org
// https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely&units=imperial&appid=bb96c7f9ac6f57dc00333727c5407547
// api key: bb96c7f9ac6f57dc00333727c5407547

// google maps api
// api key: AIzaSyDp4os33WF6-4d-xFVyL0HsUUHN7dOml_w

Geocode.setApiKey('AIzaSyDl7cLMns2Sjghy_X2NBgvVHO9nBjFemzo');

export const GeoForm = (setLatLng) => {
  const [value, setValue] = React.useState('hyderabad');

  const getLatLang = React.useCallback((address) => {
    Geocode.fromAddress(address)
      .then((res) => {
        const { lat, lng } = res.result[0].geometry.location;
        console.log({ lat, lng });
        setLatLng({ lat, lng });
      })
      .catch((err) => console.error(err));
  }, []);

  React.useEffect(() => {
    getLatLang(value);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getLatLang(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export const WeatherChart = () => {
  return (
    <Bar
      data={{
        labels: ['Monday', 'Tuesday', 'Wednesdat'],
        datasets: [
          {
            labels: 'Highs',
            data: [140, 200, 300],
          },
        ],
      }}
    />
  );
};

const labels = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const getNext7days = () => {
  const date = new Date('2020-12-15');
  const n = date.getDay() - 1;
  return [...labels.slice(n), ...labels.slice(0, n)];
};

console.log(getNext7days());

// export const rotate = (arr, n) => [...arr.slice(n), ...arr.slice(0, n)];
// console.log(rotate(labels, 2));

export default function App() {
  const [latLng, setLatLng] = React.useState(null);
  return (
    <div className="app">
      <GeoForm setLatLng={setLatLng} />
      {/* {latLng && <WeatherChart latLng={latLng}/> */}
      {/* form goes here */}
      {/* chart goes here */}
    </div>
  );
}
