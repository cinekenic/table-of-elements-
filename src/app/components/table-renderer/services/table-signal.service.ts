import { Injectable, Signal, signal } from '@angular/core';
import { PeriodicElement } from '../../../interfaces';
import { BehaviorSubject, debounceTime, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableSignalService {
  public elements = signal<PeriodicElement[]>([]);
  private originalElements = new BehaviorSubject<PeriodicElement[]>([]);

  setOriginalElements(elements: PeriodicElement[]) {
    this.originalElements.next(elements);
    this.elements.set(elements);
  }

  getElements(): Signal<PeriodicElement[]> {
    return this.elements;
  }

  updateElementsSignal(newValue: PeriodicElement[]) {
    this.elements.set(newValue);
    this.originalElements.next(newValue);
  }

  applyFilter(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value.toLowerCase();

    this.originalElements
      .pipe(
        debounceTime(2000),
        map((elements) =>
          elements.filter((element) =>
            Object.values(element).some((value) =>
              String(value).toLowerCase().startsWith(filterValue)
            )
          )
        )
      )
      .subscribe((filteredData) => {
        this.elements.set(filteredData);
      });
  }
}
