import { TestBed } from '@angular/core/testing';

import { PetTransfer } from './pet-transfer';

describe('PetTransfer', () => {
  let service: PetTransfer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetTransfer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
