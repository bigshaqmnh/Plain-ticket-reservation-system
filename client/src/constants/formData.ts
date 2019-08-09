interface MainScreenFormData {
  label: string;
  placeholder: string;
}

interface IMainScreenFormData<MainScreenFormData> {
  [key: string]: MainScreenFormData;
}

export const mainScreenFormData: IMainScreenFormData<MainScreenFormData> = {
  from: { label: 'From', placeholder: 'Departure airport' },
  to: { label: 'To', placeholder: 'Destination airport' },
  flyOut: { label: 'Fly out', placeholder: 'DD/MM/YYYY' },
  flyBack: { label: 'Fly back', placeholder: 'DD/MM/YYYY' },
  ammountOfPassengers: { label: 'Passengers', placeholder: 'Enter ammount of passengers' }
};
