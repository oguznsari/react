import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { FaStar } from "react-icons/fa";

const createArray = (length) => [
  ...Array(length)
];

function Star({ selected = false, onSelect }) {
  return (
    <FaStar color={selected ? 'red' : 'gray'} onClick={onSelect} />
  )
}

function StarRating({ totalStarts = 5 }) {
  const [selectedStars, setSelectedStars] = useState(0);
  return (
    <>
      {createArray(totalStarts).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => { setSelectedStars(i + 1) }}
        />
      ))}
      <p>{selectedStars} of {totalStarts}</p>
    </>
  );
}

function App() {
  return (
    <StarRating totalStarts={4} />
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);