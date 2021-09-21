import { TestBed } from '@angular/core/testing';

import { UserToDoService } from './user-to-do.service';

describe('UserToDoService', () => {
  let service: UserToDoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserToDoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
