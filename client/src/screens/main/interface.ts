interface IFormData {
  [from: string]: { label: string, placeholder: string, value: string };
  [to: string]: { label: string, placeholder: string, value: string };
  [flyOut: string]: { label: string, placeholder: string, value: Date };
  [flyBack: string]: { label: string, placeholder: string, value: Date };
  [ammountOfPassengers: string]: { label: string, placeholder: string, value: number };

}

export interface IMainScreenProps { }

export interface IMainScreenState {
  formData: IFormData;
}
