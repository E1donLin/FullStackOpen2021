import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  const total = parts
    .map((part) => part.exercises)
    .reduce((a, b) => {
      return a + b;
    });

  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <p>
        <b>Total of {total} exercises</b>
      </p>
    </>
  );
};

export default Content;
