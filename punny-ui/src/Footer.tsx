import React from 'react';

interface FooterProps {}

const Pun: React.FC<FooterProps> = props => {
  return (
    <footer className="footer mt-3 p-3 text-white">
      <a
        className="m-2 text-white"
        href="https://resources.sei.cmu.edu/news-events/events/scss/">
        SCSS 2019
      </a>
      <span className="font-weight-bold">|</span>
      <a
        className="text-white m-2"
        href="https://resources.sei.cmu.edu/news-events/events/scss/program.cfm">
        Hands-On Cloud Migration for Managers
      </a>
    </footer>
  );
};

export default Pun;
