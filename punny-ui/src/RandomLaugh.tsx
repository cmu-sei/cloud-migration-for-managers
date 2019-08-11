import React from 'react';
import {getRndInteger} from './utilities'

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

const Pun: React.FC<RandomLaughProps> = props => {
  const fillIndex = getRndInteger(0, 2);
  const iconIndex = getRndInteger(0, icons.length);
  const className = `${fill[fillIndex]} ${icons[iconIndex]}`
  return (
    <h1 key={className}>
      <i className={className}></i>
    </h1>
  );
};

export default Pun;
