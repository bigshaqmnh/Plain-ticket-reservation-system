import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { History } from 'history';

import MainScreenFormComponent from './components/MainScreenForm';

import { fetchAirports } from './actions';

import './style.scss';

interface IMainScreenProps {
  readonly history: History;
  readonly dispatch: (action: object) => void;
}

class MainScreen extends React.PureComponent<IMainScreenProps> {
  public componentDidMount() {
    this.props.dispatch(fetchAirports());
  }

  private handlePageChange = () => this.props.history.replace('/feed');

  public render(): JSX.Element {
    return (
      <Grid container className="container">
        <MainScreenFormComponent changePage={this.handlePageChange}/>
      </Grid>
    );
  }
}

export default connect()(MainScreen);
