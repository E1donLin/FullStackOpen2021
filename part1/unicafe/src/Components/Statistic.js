import React from 'react';

const Statistic = ({ text, stat }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
  );
};

export default Statistic;
