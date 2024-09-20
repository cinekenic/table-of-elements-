import { Component, inject, Signal, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { TableSignalService } from './services/table-signal.service';
import { DialogDataService } from './services/dialog-data.service';
import { TableBuilderService } from './services/table-builder.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-table-renderer',
  styleUrls: ['table-renderer.component.scss'],
  templateUrl: 'table-renderer.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule, MatCardModule],
})
export class TableRendererComponent implements OnInit {
  public elements!: Signal<PeriodicElement[]>;
  public displayedColumns: string[] = [];
  private tableSignalService = inject(TableSignalService);
  private dialogDataService = inject(DialogDataService);
  private tableBuilderService = inject(TableBuilderService);

  ngOnInit(): void {
    this.elements = this.tableSignalService.getElements();

    const table = this.tableBuilderService
      .column('position', 'No.')
      .column('name', 'Name')
      .column('weight', 'Weight')
      .column('symbol', 'Symbol')
      .build();

    this.displayedColumns = table.displayedColumns.filter(
      (col): col is string => typeof col === 'string'
    );
  }

  applyFilter(event: KeyboardEvent) {
    this.tableSignalService.applyFilter(event);
  }

  openEditDialog(element: PeriodicElement, fieldToEdit: string) {
    this.dialogDataService.setElementToEdit(element, fieldToEdit);
  }
}
