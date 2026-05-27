import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IncidenciaService } from './incidencia';

describe('IncidenciaService', () => {
  it('should be created', () => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    expect(TestBed.inject(IncidenciaService)).toBeTruthy();
  });
});
