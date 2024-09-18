import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ELEMENT_DATA } from '../../../consts/element-data';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const elements = ELEMENT_DATA;
    return { elements };
  }
}
