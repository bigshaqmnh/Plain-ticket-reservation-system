import componentStyles from '../componentStyles';

const alertType = {
  emptyInput: {
    variant: componentStyles.error,
    heading: 'Empty input!',
    mainText: 'Please, fill in all the fields.'
  },
  invalidInput: {
    variant: componentStyles.error,
    heading: 'Invalid input!',
    mainText: 'Please, verify your input according to the hints.'
  }
};

export default alertType;
