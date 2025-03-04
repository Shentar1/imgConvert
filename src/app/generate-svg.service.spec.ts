import { TestBed } from '@angular/core/testing';

import { GenerateSVGService } from './generate-svg.service';

describe('GenerateSVGService', () => {
  let service: GenerateSVGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateSVGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
