import React from 'react';
import Puns, {IPun} from './Puns';
import Loading from './Loading';
import AppError from './AppError';
import Footer from './Footer';
import Header from './Header';

enum AppState {
  LOADING,
  ERROR,
  READY,
}

interface IAppProps {}

interface IAppState {
  appState: AppState;
  puns: IPun[];
}

class App extends React.Component<IAppProps, IAppState> {
  state: IAppState = {
    appState: AppState.LOADING,
    puns: [],
  };

  componentDidMount() {
    fetch(`${process.env.REACT_APP_PUN_API}puns`)
      .then(resp => resp.json())
      .then(data => {
        this.setState(state => ({
          ...state,
          puns: data,
          appState: AppState.READY,
        }));
      })
      .catch(err => {
        this.setState(state => ({...state, appState: AppState.ERROR}));
      });
  }

  render() {
    const {appState} = this.state;

    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col">
              {appState === AppState.ERROR && <AppError />}
              {appState === AppState.LOADING && <Loading />}
              {appState === AppState.READY && <Puns puns={this.state.puns} />}
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
