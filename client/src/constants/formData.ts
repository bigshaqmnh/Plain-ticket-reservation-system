interface MainScreenFormData {
  initValue: any;
  label: string;
  placeholder: string;
}

interface IMainScreenFormData<MainScreenFormData> {
  [key: string]: MainScreenFormData;
}

export const mainScreenFormData: IMainScreenFormData<MainScreenFormData> = {
  from: { initValue: '', label: 'From', placeholder: 'Country, city' },
  to: { initValue: '', label: 'To', placeholder: 'Country, city' },
  flyOut: { initValue: null, label: 'Fly out', placeholder: 'DD/MM/YYYY' },
  flyBack: { initValue: null, label: 'Fly back', placeholder: 'DD/MM/YYYY' },
  ammountOfPassengers: { initValue: 1, label: 'Passengers', placeholder: '1' }
};
