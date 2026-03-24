import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PetTransfer, PetTransferResponse } from '../../services/pet-transfer';

@Component({
  selector: 'app-pet-transfer',
  imports: [CommonModule, FormsModule],
  templateUrl: './pet-transfer.html',
  styleUrl: './pet-transfer.scss'
})
export class PetTransferComponent {
  @Input() petId!: number;
  newOwnerId: number | null = null;
  activeTransfer: PetTransferResponse | null = null;
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private transferService: PetTransfer,
    private location: Location,
    private route: ActivatedRoute, 
    private cdr: ChangeDetectorRef 
  ) {
    this.petId = +this.route.snapshot.paramMap.get('petId')!;
  }

  initiateTransfer(): void {
    if (!this.newOwnerId) return;
    this.clearMessages();
    this.isLoading = true;

    this.transferService.createTransfer(this.petId, this.newOwnerId).subscribe({
      next: (transfer) => {
        this.activeTransfer = transfer;
        this.successMessage = 'Transfer request sent. Waiting for new owner to confirm.';
        this.isLoading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        this.errorMessage = err.error?.message ?? 'Failed to create transfer request.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  acceptTransfer(): void {
    if (!this.activeTransfer) return;
    this.clearMessages();
    this.isLoading = true;

    this.transferService.acceptTransfer(this.petId, this.activeTransfer.id).subscribe({
      next: (transfer) => {
        this.activeTransfer = transfer;
        this.successMessage = 'Transfer accepted. Ownership has been updated.';
        this.isLoading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        this.errorMessage = err.error?.message ?? 'Failed to accept transfer.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  declineTransfer(): void {
    if (!this.activeTransfer) return;
    this.clearMessages();
    this.isLoading = true;

    this.transferService.declineTransfer(this.petId, this.activeTransfer.id).subscribe({
      next: (transfer) => {
        this.activeTransfer = transfer;
        this.successMessage = 'Transfer declined.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error?.message ?? 'Failed to decline transfer.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  cancelTransfer(): void {
    if (!this.activeTransfer) return;
    this.clearMessages();
    this.isLoading = true;

    this.transferService.cancelTransfer(this.petId, this.activeTransfer.id).subscribe({
      next: () => {
        this.successMessage = 'Transfer cancelled.';
        this.activeTransfer = null;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error?.message ?? 'Failed to cancel transfer.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  goBack(): void {
    this.location.back();
  }

  get isPending(): boolean {
    return this.activeTransfer?.status === 'PENDING';
  }

  private clearMessages(): void {
    this.errorMessage = null;
    this.successMessage = null;
  }
}