import {
  Component,
  ViewChild,
  inject,
  TemplateRef,
  OnInit,
  signal,
} from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ServerMockService } from '../../api/services/server-mock.service';
import { EditDialogData, PeriodicElement } from '../../interfaces';
import { BehaviorSubject, debounceTime, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-renderer',
  styleUrls: ['table-renderer.component.scss'],
  templateUrl: 'table-renderer.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class TableRendererComponent implements OnInit {
  private elementService = inject(ServerMockService);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  public elements = signal<PeriodicElement[]>([]);
  public paginatedElements = signal<PeriodicElement[]>([]);
  private originalElements = new BehaviorSubject<PeriodicElement[]>([]);
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  editForm: FormGroup;

  @ViewChild('editDialog') editDialogTemplate!: TemplateRef<EditDialogData>;

  filterValue = '';
  filterTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.editForm = this.fb.group({
      fieldToEdit: [''],
      newValue: [''],
    });
  }

  ngOnInit() {
    this.elementService.getElements().subscribe({
      next: (elements) => {
        this.elements.set(elements);
        this.originalElements.next(elements);
      },
      error: (err) => {
        console.error('Błąd podczas pobierania danych:', err);
      },
    });
  }

  applyFilter(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value.toLowerCase();

    this.originalElements
      .pipe(
        debounceTime(2000),
        map((elements) =>
          elements.filter((element) =>
            Object.values(element).join(' ').toLowerCase().includes(filterValue)
          )
        )
      )
      .subscribe((filteredData) => {
        this.elements.set(filteredData);
      });
  }

  openEditDialog(element: PeriodicElement, fieldToEdit: string) {
    const dialogRef = this.dialog.open(this.editDialogTemplate, {
      data: {
        fieldToEdit: fieldToEdit,
        newValue: element[fieldToEdit],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.newValue !== undefined) {
        const currentElements = this.elements();

        const updatedElements = currentElements.map((el) => {
          if (el.position === element.position) {
            return { ...el, [result.fieldToEdit]: result.newValue };
          }
          return el;
        });

        this.elements.set(updatedElements);
      }
    });
  }

  save(dialogRef: MatDialogRef<TableRendererComponent>, data: EditDialogData) {
    console.log(data);
    dialogRef.close({
      fieldToEdit: data.fieldToEdit,
      newValue: data.newValue,
    });
  }
}
