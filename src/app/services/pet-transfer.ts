import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type TransferStatus = 'PENDING' | 'COMPLETED' | 'REJECTED' | 'CANCELLED';

export interface PetTransferResponse {
  id: number;
  petId: number;
  oldOwnerId: number;
  newOwnerId: number;
  status: TransferStatus;
  startedAt: string;
  confirmedAt: string | null;
}

@Injectable({ providedIn: 'root' })
export class PetTransfer {
  private readonly base = 'http://localhost:8080/api/pets';

  constructor(private http: HttpClient) {}

  createTransfer(petId: number, newOwnerId: number): Observable<PetTransferResponse> {
    return this.http.post<PetTransferResponse>(
      `${this.base}/${petId}/transfers`,
      { newOwnerId }
    );
  }

  acceptTransfer(petId: number, transferId: number): Observable<PetTransferResponse> {
    return this.http.patch<PetTransferResponse>(
      `${this.base}/${petId}/transfers/${transferId}/accept`,
      {}
    );
  }

  declineTransfer(petId: number, transferId: number): Observable<PetTransferResponse> {
    return this.http.patch<PetTransferResponse>(
      `${this.base}/${petId}/transfers/${transferId}/decline`,
      {}
    );
  }

  cancelTransfer(petId: number, transferId: number): Observable<void> {
    return this.http.patch<void>(
      `${this.base}/${petId}/transfers/${transferId}/cancel`,
      {}
    );
  }
}