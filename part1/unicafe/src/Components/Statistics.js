import React from 'react';
import Statistic from './Statistic';

const Statistics = ({ stats }) => {
  const total = stats.reduce((a, b) => a + b);
  const average = (stats[0] - stats[2]) / total;
  const positive = (stats[0] / total) * 100 + '%';

  if (total === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <table>
        <tbody>
          <Statistic text='good' stat={stats[0]} />
          <Statistic text='neutral' stat={stats[1]} />
          <Statistic text='bad' stat={stats[2]} />
          <Statistic text='all' stat={total} />
          <Statistic text='average' stat={average} />
          <Statistic text='positive' stat={positive} />
        </tbody>
      </table>
    );
  }
};

export default Statistics;
