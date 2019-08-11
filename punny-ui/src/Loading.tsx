import React from 'react';

interface LoadingProps {}

const Pun: React.FC<LoadingProps> = props => {
  return (
    <div className="text-center">
      <h1 className="m-4">Loading...</h1>
      <div className="spinner-border m-4" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Pun;
