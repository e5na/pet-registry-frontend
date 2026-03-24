import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Pet } from '../../../../models/pet.model';
import { PetService } from '../../../../services/pet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-report',
  imports: [CommonModule],
  templateUrl: './pet-report.html',
  styleUrl: './pet-report.scss',
})
export class PetReport implements OnInit {
  pets: Pet[] = []; // Siia tulevad loomad
  loading = true;

  constructor(
    private petService: PetService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.petService.getAll().subscribe({
      next: (data) => {
        this.pets = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Loomade laadimine ebaõnnestus', err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
