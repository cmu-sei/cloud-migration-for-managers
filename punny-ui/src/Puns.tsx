import React from 'react';
import Pun from './Pun';

export interface IPun {
  pun: string;
}

interface IPunsProps {
  puns: Array<IPun>;
}

interface IPunsState {
  selectedIndex: number;
}

class Puns extends React.Component<IPunsProps, IPunsState> {
  state: IPunsState = {
    selectedIndex: 0,
  };

  constructor(props: IPunsProps) {
    super(props);

    this.previousPun = this.previousPun.bind(this);
    this.nextPun = this.nextPun.bind(this);
  }

  previousPun() {
    this.setState(state => ({
      ...state,
      selectedIndex: state.selectedIndex - 1,
    }));
  }

  nextPun() {
    this.setState(state => ({
      ...state,
      selectedIndex: state.selectedIndex + 1,
    }));
  }

  render() {
    const prevDisabled = this.state.selectedIndex === 0;
    const nextDisabled =
      this.state.selectedIndex === this.props.puns.length - 1;

    return (
      <React.Fragment>
        <div className="jumbotron">
          <Pun pun={this.props.puns[this.state.selectedIndex].pun} />
          <hr />
          <nav>
            <span>
              Showing {this.state.selectedIndex + 1} of {this.props.puns.length}
            </span>
            <ul className="pagination pagination-sm">
              <li className={'page-item' + (prevDisabled ? ' disabled' : '')}>
                <button
                  className="page-link"
                  onClick={this.previousPun}
                  disabled={prevDisabled}>
                  <i className="fa fa-chevron-circle-left"></i> Previous
                </button>
              </li>
              <li className={'page-item' + (nextDisabled ? ' disabled' : '')}>
                <button
                  className="page-link"
                  onClick={this.nextPun}
                  disabled={nextDisabled}>
                  Next <i className="fa fa-chevron-circle-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Puns;
