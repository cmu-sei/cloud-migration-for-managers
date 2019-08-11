import React from 'react';

interface HeaderProps {}

enum DisplayState {
  LARGE,
  SMALL,
}

const SHRINK_ON = 5;

class Pun extends React.Component<HeaderProps> {
  state = {
    displayState: DisplayState.LARGE,
  };

  constructor(props: HeaderProps) {
    super(props);

    this.headerSizer = this.headerSizer.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.headerSizer);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.headerSizer);
  }

  headerSizer() {
    const distanceY = window.pageYOffset || document.documentElement!.scrollTop;

    //Now In the condition change the state to smaller so if the condition
    //is true it will change to smaller otherwise to default state
    if (distanceY > SHRINK_ON) {
      this.setState(state => ({...state, displayState: DisplayState.SMALL}));
    } else {
      this.setState(state => ({...state, displayState: DisplayState.LARGE}));
    }
  }

  render() {
    switch (this.state.displayState) {
      case DisplayState.LARGE:
        return (
          <header className="text-white p-5 mb-3">
            <p className="display-3">SCSS Punny Application</p>
            <h2>Hands-On Cloud Migration for Managers</h2>
          </header>
        );
      case DisplayState.SMALL:
        return (
          <header className="text-white p-2 mb-3">
            <p className="display-4">SCSS Punny Application</p>
          </header>
        );
    }
  }
}

export default Pun;
