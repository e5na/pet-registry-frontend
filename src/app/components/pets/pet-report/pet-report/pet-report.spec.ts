import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetReport } from './pet-report';

describe('PetReport', () => {
  let component: PetReport;
  let fixture: ComponentFixture<PetReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetReport],
    }).compileComponents();

    fixture = TestBed.createComponent(PetReport);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
