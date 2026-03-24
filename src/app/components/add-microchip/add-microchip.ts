import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MicrochipService } from '../../services/microchip.service';
import { Router } from '@angular/router';
import { delay, filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-add-microchip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-microchip.html',
  styleUrl: './add-microchip.scss',
})
export class MicrochipComponent {
  chipForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private chipService: MicrochipService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
  ) {
    this.chipForm = this.fb.group({
      microchipNumber: ['', [Validators.required, Validators.pattern('^[0-9]{15}$')]],
      importer: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.setupChipLookup();
  }

  onSubmit() {
    if (this.chipForm.valid) {
      this.isLoading = true;
      const newChip = this.chipForm.value;
      this.chipService.addMicrochip(newChip).subscribe({
        next: (response) => {
          console.log('Server vastas:', response);
          this.isLoading = false;
          alert('Mikrokiip edukalt registreeritud!');
          this.router.navigate(['/dashboard']); // Suuna kasutaja edasi
        },
        error: (err) => {
          console.error('Viga saatmisel:', err);
          this.isLoading = false;
          alert('Serveri viga! Kontrolli, kas backend jookseb.');
        },
      });
    }
  }

  private setupChipLookup(): void {
    this.chipForm
      .get('microchipNumber')
      ?.valueChanges.pipe(
        tap((value) => {
          if (!value || value.length < 15) {
            this.chipForm.get('microchipId')?.setValue(null);
          }
        }),
        filter((value): value is string => !!value && value.length === 15),
        delay(500),
        switchMap((number) => this.chipService.getMicrochipByNumber(number)),
      )
      .subscribe({
        next: (chip) => this.handleChipResponse(chip),
        error: (err) => console.error('Failed to find microchip:', err),
      });
  }

  private handleChipResponse(chips: any): void {
    const chipControl = this.chipForm.get('microchipNumber');
    const chip = chips && chips.length > 0 ? chips[0] : null;

    if (chip) {
      chipControl?.setErrors({ alreadyInUse: true });
    }
  }
}
