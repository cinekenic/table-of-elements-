import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodicElement } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ServerMockService {
  readonly http = inject(HttpClient);
  private apiUrl = 'api/elements';

  getElements(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.apiUrl);
  }
}
