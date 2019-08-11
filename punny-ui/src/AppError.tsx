import React from 'react';

interface AppErrorProps {}

const Pun: React.FC<AppErrorProps> = props => {
  return (
    <div className="alert alert-danger container" role="alert">
      <div className="row">
        <div className="col-1">
          <h1>
            <i className="fa fa-exclamation-triangle"></i>
          </h1>
        </div>
        <div className="col">
          <h1>
            There was an error loading the application data. Please try again
            later.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Pun;
