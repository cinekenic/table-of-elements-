import {
  Component,
  OnInit,
  Signal,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { EditDialogData, PeriodicElement } from '../../interfaces';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TableSignalService } from '../table-renderer/services/table-signal.service';
import { TableRendererComponent } from '../table-renderer/table-renderer.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { DialogDataService } from '../table-renderer/services/dialog-data.service';

@Component({
  selector: 'app-dialog-elements',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-elements.component.html',
  styleUrl: './dialog-elements.component.scss',
})
export class DialogElementsComponent implements OnInit {
  @ViewChild('editDialog') editDialogTemplate!: TemplateRef<EditDialogData>;
  private dialog = inject(MatDialog);
  private tableSignalService = inject(TableSignalService);
  private dialogDataService = inject(DialogDataService);
  public elements!: Signal<PeriodicElement[]>;

  ngOnInit(): void {
    this.elements = this.tableSignalService.getElements();

    this.dialogDataService.getElementToEdit().subscribe((data) => {
      if (data) {
        this.openEditDialog(data.element, data.fieldToEdit);
      }
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

        this.tableSignalService.updateElementsSignal(updatedElements);
      }
    });
  }

  save(dialogRef: MatDialogRef<TableRendererComponent>, data: EditDialogData) {
    dialogRef.close({
      fieldToEdit: data.fieldToEdit,
      newValue: data.newValue,
    });
  }
}
