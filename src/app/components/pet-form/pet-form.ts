import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { PetService } from '../../services/pet.service';
import { delay, filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pet-form.html',
  styleUrl: './pet-form.scss',
})
export class PetFormComponent {
  petForm: FormGroup;
  speciesList: any[] = [];
  breedsList: any[] = [];
  sex = ['M', 'F'];

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private auth: Auth,
    private petService: PetService,
  ) {
    this.petForm = this.fb.group({
      microchipNumber: ['', [Validators.required, Validators.pattern('^[0-9]{15}$')]],
      microchipId: [null, Validators.required],
      species: ['', Validators.required],
      name: ['', Validators.required],
      sex: ['', Validators.required],
      birthDate: ['', Validators.required],
      breedId: ['', Validators.required],
      color: ['', Validators.required],
      //photo: [null], // Valikuline
      status: ['ACTIVE'],
      ownerId: this.auth.getCurrentUserId(),
    });
  }

  ngOnInit() {
    this.loadInitialData(); // Algandmete laadimine (liigid)
    this.setupChipLookup(); // Kiibi otsingu kuulamine
    this.setupSpeciesWatcher(); // Liigi muutuse ja tõugude laadimise kuulamine
  }

  private loadInitialData(): void {
    this.loadSpecies();
  }

  private setupChipLookup(): void {
    this.petForm
      .get('microchipNumber')
      ?.valueChanges.pipe(
        tap((value) => {
          if (!value || value.length < 15) {
            this.petForm.get('microchipId')?.setValue(null);
          }
        }),
        filter((value): value is string => !!value && value.length === 15),
        delay(500),
        switchMap((number) => this.petService.getMicrochipByNumber(number)),
      )
      .subscribe({
        next: (chip) => this.handleChipResponse(chip),
        error: (err) => console.error('Failed to find microchip:', err),
      });
  }

  private handleChipResponse(chips: any): void {
    const chipControl = this.petForm.get('microchipNumber');
    const idControl = this.petForm.get('microchipId');
    const chip = chips && chips.length > 0 ? chips[0] : null;

    if (chip) {
      if (chip.inUse) {
        idControl?.setValue(null);
        chipControl?.setErrors({ alreadyInUse: true });
      } else {
        idControl?.setValue(chip.id);
        chipControl?.setErrors(null);
        idControl?.updateValueAndValidity();
      }
    } else {
      idControl?.setValue(null);
      chipControl?.setErrors({ notFound: true });
    }

    this.cdRef.detectChanges();
  }

  private setupSpeciesWatcher(): void {
    this.petForm.get('species')?.valueChanges.subscribe((selectedId) => {
      if (selectedId) {
        this.petService.getBreeds(selectedId).subscribe({
          next: (data) => {
            this.breedsList = data;
            this.petForm.get('breedId')?.setValue('');
          },
          error: (err) => console.error('Failed to load breeds', err),
        });
      }
    });
  }

  loadSpecies() {
    this.petService.getSpecies().subscribe({
      next: (data) => {
        this.speciesList = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Failed to load species', err);
      },
    });
  }

  onSubmit() {
    if (this.petForm.valid) {
      const petData = this.petForm.value;

      this.petService.addPet(petData).subscribe({
        next: (response) => {
          console.log('Pet registrated', response);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Failed to save pet:', err);
        },
      });
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
