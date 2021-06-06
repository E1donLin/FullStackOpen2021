import React from 'react';
import Content from './Content';
import Header from './Header';

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <div>
      <Header course_name={name} />
      <Content parts={parts} />
    </div>
  );
};

export default Course;
