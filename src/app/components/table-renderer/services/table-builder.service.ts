import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableBuilderService {
  private columns: { key: string; header: string }[] = [];

  column(key: string, header: string): TableBuilderService {
    this.columns.push({ key, header });
    return this;
  }

  build() {
    return {
      displayedColumns: this.columns.map((col) => col.key),
      columnDefinitions: this.columns,
    };
  }

  clear(): void {
    this.columns = [];
  }
}
