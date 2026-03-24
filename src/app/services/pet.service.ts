import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePetRequest, Pet, UpdatePetRequest } from '../models/pet.model';
import { catchError, Observable, of } from 'rxjs';
import { Microchip } from '../models/microchip.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.API_URL}/pets`);
  }

  getOne(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.API_URL}/pets/${id}`);
  }

  create(data: CreatePetRequest): Observable<Pet> {
    return this.http.post<Pet>(`${this.API_URL}/pets`, data);
  }

  update(id: number, data: UpdatePetRequest): Observable<Pet> {
    return this.http.patch<Pet>(`${this.API_URL}/pets/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/pets/${id}`);
  }

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

  reportPetAsLost(id: number): Observable<Pet> {
    return this.http.patch<Pet>(`${this.API_URL}/pets/${id}/report-lost`, null);
  }

  reportPetAsDead(id: number): Observable<Pet> {
    return this.http.patch<Pet>(`${this.API_URL}/pets/${id}/report-death`, null);
  }
}
