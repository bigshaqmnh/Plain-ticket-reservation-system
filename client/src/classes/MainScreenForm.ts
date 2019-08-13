import moment = require('moment');

class MainScreenForm {
  [key: string]: any;

  public from: string;
  public to: string;
  public flyOut: moment.Moment;
  public flyBack: moment.Moment;
  public ammountOfPassengers: number;

  constructor() {
    this.from = '';
    this.to = '';
    this.flyOut = moment();
    this.flyBack = moment();
    this.ammountOfPassengers = 1;
  }
}

export default MainScreenForm;
