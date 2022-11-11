import { TestBed } from '@angular/core/testing';

import { FetchApiDataServie } from './fetch-api-data.service';

describe('FetchApiDataService', () => {
  let service: FetchApiDataServie;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchApiDataServie);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
