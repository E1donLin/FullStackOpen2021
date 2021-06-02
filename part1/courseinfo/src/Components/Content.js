import React from 'react';
import Part from './Part';

const Content = ({ parts }) => {
  const a = parts.map((part, index) => {
    return <Part part={part} key={index} />;
  });
  return <div>{a}</div>;
};

export default Content;
