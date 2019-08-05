import * as React from 'react';

import InputAutoComplete from './components/InputAutoComplete';

import { mainFormData } from '../../constants/formDataSchemes';

import { IMainScreenProps, IMainScreenState } from './interface';

class MainScreen extends React.PureComponent<IMainScreenProps, IMainScreenState> {
  public constructor(props: IMainScreenProps) {
    super(props);
    this.state = {
      formData: mainFormData
    };
  }

  private handleChange = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = currentTarget;

    this.setState((prevState: IMainScreenState) => ({
      ...prevState,
      formData: { ...prevState.formData, [name]: { ...prevState.formData[name], value } }
    }));
  }

  public render() {
    const formFields: string[] = Object.keys(this.state.formData);

    return (
      formFields.map((field) => {
        const { formData } = this.state;


        return <InputAutoComplete
          label={formData[field].label}
          name={field}
          value={formData[field].value}
          placeholder={formData[field].placeholder}
          onChange={this.handleChange}
        />;
      })
    );
  }
}

export default MainScreen;
