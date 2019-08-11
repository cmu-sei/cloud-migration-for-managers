import React from 'react';
import RandomLaugh from './RandomLaugh';

interface PunProps {
  pun: string;
}

const Pun: React.FC<PunProps> = (props: PunProps) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <RandomLaugh />
        </div>
        <div className="col">
          <RandomLaugh />
        </div>
        <div className="col">
          <RandomLaugh />
        </div>
        <div className="col">
          <RandomLaugh />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h1 className="text-center pun">{props.pun}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <RandomLaugh />
        </div>
        <div className="col">
          {' '}
          <RandomLaugh />{' '}
        </div>
        <div className="col">
          {' '}
          <RandomLaugh />{' '}
        </div>
        <div className="col">
          {' '}
          <RandomLaugh />{' '}
        </div>
      </div>
    </div>
  );
};

export default Pun;
