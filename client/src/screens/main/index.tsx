import * as React from 'react';

import {
  DateTimePicker
} from '@material-ui/pickers';

import MainScreenForm from '../../classes/MainScreenForm';

import { mainScreenFormData } from '../../constants/formData';

import MainScreenFormComponent from './components/MainScreenForm';

import { IMainScreenProps, IMainScreenState } from './interface';

import { Moment } from 'moment';

class MainScreen extends React.PureComponent<IMainScreenProps, IMainScreenState> {
  public constructor(props: IMainScreenProps) {
    super(props);
    const formData = new MainScreenForm();

    this.state = {
      formData
    };
  }


  private getDateHandler = (name: string) => (date: Moment) => {
    this.setState((prevState) => ({
      ...prevState,
      formData: { ...prevState.formData, [name]: { ...prevState.formData[name], date } }
    }));
  }

  private DateTimePicker = (props: any) => {
    const {
      input: { name, onChange, value, ...restInput },
      meta,
      ...rest
    } = props;

    const showError =
      ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
      meta.touched;

    return <DateTimePicker
      variant="inline"
      value={value}
      onChange={this.getDateHandler(name)}
      showTodayButton={true}
      format="yyyy/MM/dd HH:mm"
      error={showError}
    />
  }

  private handleDateChange = (date: Date) => console.log('recieved date: ', date);

  public render(): React.ReactNode {
    const { formData } = this.state;

    return <MainScreenFormComponent
      {...formData}
      handleDateChange={this.handleDateChange}
    />;

  }
}

export default MainScreen;
