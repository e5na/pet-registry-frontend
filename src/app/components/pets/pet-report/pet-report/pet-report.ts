import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Pet } from '../../../../models/pet.model';
import { PetService } from '../../../../services/pet.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pet-report',
  imports: [CommonModule, FormsModule],
  templateUrl: './pet-report.html',
  styleUrl: './pet-report.scss',
})
export class PetReport implements OnInit {
  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  searchTerm: string = '';
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
        this.filteredPets = data;
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

  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredPets = this.pets;
    } else {
      this.filteredPets = this.pets.filter((pet) => {
        return (
          pet.name.toLowerCase().includes(term) ||
          pet.breed?.name.toLowerCase().includes(term) ||
          pet.microchip?.microchipNumber.includes(term)
        );
      });
    }
    this.cdr.detectChanges();
  }
}
