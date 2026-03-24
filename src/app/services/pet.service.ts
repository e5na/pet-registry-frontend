import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { CreatePetRequest } from '../models/pet.model';
import { Microchip } from '../models/microchip.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  addPet(data: CreatePetRequest) {
    return this.http.post(`${this.API_URL}/pets`, data);
  }

  getSpecies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/species`);
  }

  getBreeds(speciesId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/breeds?speciesId=${speciesId}`);
  }

  getMicrochipByNumber(microchipNumber: string): Observable<Microchip | null> {
    return this.http
      .get<Microchip>(`${this.API_URL}/microchips?chipNumber=${microchipNumber}`)
      .pipe(
        catchError(() => of(null)), // Kui kiipi ei leita, tagastame nulli
      );
  }
}
