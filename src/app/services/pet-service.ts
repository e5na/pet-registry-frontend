import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePetRequest, Pet, UpdatePetRequest } from '../models/pet.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private readonly API_URL = "http://localhost:8080/api/pets";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.API_URL);
  }

  getOne(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.API_URL}/${id}`)
  }

  create(data: CreatePetRequest): Observable<Pet> {
    return this.http.post<Pet>(this.API_URL, data);
  }

  update(id: number, data: UpdatePetRequest): Observable<Pet>{
    return this.http.patch<Pet>(`${this.API_URL}/${id}`, data);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

}
