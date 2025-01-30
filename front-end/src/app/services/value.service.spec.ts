import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ValueService } from './value.service';
import { StorageService } from './storage.service';

describe('ValueService', () => {
  let service: ValueService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ValueService, StorageService]
    });
    service = TestBed.inject(ValueService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve values', () => {
    const mockValues = [{ id: 1, value: 'test' }];

    service.getValues().subscribe(values => {
      expect(values.length).toBe(1);
      expect(values).toEqual(mockValues);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/value`);
    expect(req.request.method).toBe('GET');
    req.flush(mockValues);
  });

  afterEach(() => {
    httpMock.verify();
  });
});