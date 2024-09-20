import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PeriodicElement } from '../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DialogDataService {
  private elementToEdit = new BehaviorSubject<{
    element: PeriodicElement;
    fieldToEdit: string;
  } | null>(null);

  setElementToEdit(element: PeriodicElement, fieldToEdit: string) {
    this.elementToEdit.next({ element, fieldToEdit });
  }

  getElementToEdit() {
    return this.elementToEdit.asObservable();
  }
}
