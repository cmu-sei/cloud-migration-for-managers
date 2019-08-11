import React from 'react';

interface RandomLaughProps {}

const fill = ['far', 'fas'];
const icons = [
  'fa-grin-squint-tears',
  'fa-grin-wink',
  'fa-grin',
  'fa-grin-alt',
  'fa-grin-beam',
  'fa-grin-squint',
  'fa-laugh-beam',
  'fa-laugh-squint',
  'fa-laugh-wink',
  'fa-laugh',
];

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const Pun: React.FC<RandomLaughProps> = props => {
  const thisFill = fill[getRndInteger(0, 1)];
  const thisIcon = icons[getRndInteger(0, icons.length)];
  return (
    <h1>
      <i className={`${thisFill} ${thisIcon}`}></i>
    </h1>
  );
};

export default Pun;
