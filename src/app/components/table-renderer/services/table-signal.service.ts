import { Injectable, Signal, inject, signal } from '@angular/core';
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
  }

  applyFilter(event: KeyboardEvent) {
    console.log(event);
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
        console.log(filteredData);
        this.elements.set(filteredData);
      });
  }
}
