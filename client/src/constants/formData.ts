interface IFormData {
  initValue: any;
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
  amountOfPassengers: { initValue: 1, label: 'Passengers', placeholder: '1' }
};
