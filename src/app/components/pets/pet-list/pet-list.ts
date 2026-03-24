import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PetService } from '../../../services/pet-service';
import { Pet } from '../../../models/pet.model';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-pet-list',
  imports: [CommonModule],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.scss'
})
export class PetList implements OnInit {
  pets: Pet[] = [];
  loading = true;
  error = '';

  constructor(
    private petService: PetService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();
    this.petService.getAll().subscribe({
      next: (pets) => {
        this.pets = pets.filter(p => p.owner?.id === currentUser?.id);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Loomade laadimine ebaõnnestus';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  expandedPetId: number | null = null;

  togglePet(id: number): void {
    console.log('clicked id:', id, typeof id);
    this.expandedPetId = this.expandedPetId === id ? null : id;
    console.log('expandedPetId:', this.expandedPetId);
    this.cdr.detectChanges();
  }
}