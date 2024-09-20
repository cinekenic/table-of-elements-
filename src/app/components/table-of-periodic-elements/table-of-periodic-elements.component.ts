import {
  Component,
  OnInit,
  Signal,
  TemplateRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { ServerMockService } from '../../api/services/server-mock.service';
import { EditDialogData, PeriodicElement } from '../../interfaces';
import { BehaviorSubject, debounceTime, map } from 'rxjs';
import { TableRendererComponent } from '../table-renderer/table-renderer.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TableSignalService } from '../table-renderer/services/table-signal.service';
import { DialogElementsComponent } from '../dialog-elements/dialog-elements.component';

@Component({
  selector: 'app-table-of-periodic-elements',
  standalone: true,
  imports: [TableRendererComponent, DialogElementsComponent],
  templateUrl: './table-of-periodic-elements.component.html',
  styleUrl: './table-of-periodic-elements.component.scss',
})
export class TableOfPeriodicElementsComponent implements OnInit {
  public elements!: Signal<PeriodicElement[]>;
  public editForm: FormGroup;
  public filterValue = '';
  private elementService = inject(ServerMockService);
  private fb = inject(FormBuilder);
  private tableSignalService = inject(TableSignalService);

  constructor() {
    this.editForm = this.fb.group({
      fieldToEdit: [''],
      newValue: [''],
    });
  }

  ngOnInit() {
    this.elements = this.tableSignalService.getElements();
    this.elementService.getElements().subscribe({
      next: (elements) => {
        this.tableSignalService.updateElementsSignal(elements);
        this.tableSignalService.setOriginalElements(elements);
      },
      error: (err) => {
        console.error('Błąd podczas pobierania danych:', err);
      },
    });
  }
}
