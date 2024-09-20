import { Component, inject, Signal, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { TableSignalService } from './services/table-signal.service';
import { DialogDataService } from './services/dialog-data.service';

@Component({
  selector: 'app-table-renderer',
  styleUrls: ['table-renderer.component.scss'],
  templateUrl: 'table-renderer.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule],
})
export class TableRendererComponent implements OnInit {
  public elements!: Signal<PeriodicElement[]>;

  public displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  private tableSignalService = inject(TableSignalService);
  private dialogDataService = inject(DialogDataService);

  ngOnInit(): void {
    this.elements = this.tableSignalService.getElements();
  }

  applyFilter(event: KeyboardEvent) {
    this.tableSignalService.applyFilter(event);
  }

  openEditDialog(element: PeriodicElement, fieldToEdit: string) {
    this.dialogDataService.setElementToEdit(element, fieldToEdit);
  }
}
