import React from 'react';

interface HeaderProps {}

const Pun: React.FC<HeaderProps> = props => {
  return (
    <header className="text-white p-5 mb-3">
      <p className="display-3">SCSS Punny Application</p>
      <h2>Hands-On Cloud Migration for Managers</h2>
    </header>
  );
};

export default Pun;
