import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerMockService {
  readonly http = inject(HttpClient);
  private apiUrl = 'api/elements';

  getElements(): Observable<Element[]> {
    return this.http.get<Element[]>(this.apiUrl);
  }
}
