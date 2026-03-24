import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateMicrochipRequest, Microchip } from '../models/microchip.model';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MicrochipService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  addMicrochip(data: CreateMicrochipRequest) {
    return this.http.post(this.API_URL + '/microchips', data);
  }

  getMicrochipByNumber(microchipNumber: string): Observable<Microchip | null> {
    return this.http
      .get<Microchip>(`${this.API_URL}/microchips?chipNumber=${microchipNumber}`)
      .pipe(
        catchError(() => of(null)), // Kui kiipi ei leita, tagastame nulli
      );
  }
}
