/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GuardLoginService } from './guardLogin.service';

describe('Service: GuardLogin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardLoginService]
    });
  });

  it('should ...', inject([GuardLoginService], (service: GuardLoginService) => {
    expect(service).toBeTruthy();
  }));
});