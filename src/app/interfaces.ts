export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
  [key: string]: string | number;
}

export interface EditDialogData {
  fieldToEdit: string;
  newValue: string | number;
}
