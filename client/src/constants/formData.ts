import { Moment } from 'moment';

interface IFormData {
  initValue: string | number | Moment;
  label: string;
  placeholder: string;
}

interface IMainScreenFormData<IFormData> {
  [key: string]: IFormData;
}

export const mainScreenFormData: IMainScreenFormData<IFormData> = {
  from: { initValue: '', label: 'From', placeholder: 'Country, city' },
  to: { initValue: '', label: 'To', placeholder: 'Country, city' },
  flyOut: { initValue: null, label: 'Fly out', placeholder: 'DD/MM/YYYY' },
  flyBack: { initValue: null, label: 'Fly back', placeholder: 'DD/MM/YYYY' },
  numberOfPassengers: { initValue: 1, label: 'Passengers', placeholder: '1' }
};
