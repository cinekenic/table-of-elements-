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

export interface ColumnDefinition<T> {
  header: string;
  columnDef: keyof T;
  cell: (element: T) => string;
}
