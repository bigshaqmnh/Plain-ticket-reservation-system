import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { History } from 'history';

import { IDispatch } from '../../interfaces';

import MainScreenFormComponent from './components/MainScreenForm';

import { fetchAirports } from './actionCreators';

import './style.scss';

interface IMainScreenProps {
  readonly history: History;
  fetchAirports: () => void;
  readonly dispatch: IDispatch;
}

class MainScreen extends React.PureComponent<IMainScreenProps> {
  public componentDidMount() {
    this.props.fetchAirports();
  }

  public render(): JSX.Element {
    return (
      <Grid container className="container">
        <MainScreenFormComponent/>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch: IDispatch) => ({
  fetchAirports: () => dispatch(fetchAirports())
});

export default connect(null, mapDispatchToProps)(MainScreen);
