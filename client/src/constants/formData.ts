interface MainScreenFormData {
  initValue: any;
  label: string;
  placeholder: string;
}

interface IMainScreenFormData<MainScreenFormData> {
  [key: string]: MainScreenFormData;
}

export const mainScreenFormData: IMainScreenFormData<MainScreenFormData> = {
  from: { initValue: '', label: 'From', placeholder: 'Departure airport' },
  to: { initValue: '', label: 'To', placeholder: 'Destination airport' },
  flyOut: { initValue: null, label: 'Fly out', placeholder: 'DD/MM/YYYY' },
  flyBack: { initValue: null, label: 'Fly back', placeholder: 'DD/MM/YYYY' },
  ammountOfPassengers: { initValue: 1, label: 'Passengers', placeholder: 'Enter ammount of passengers' }
};
