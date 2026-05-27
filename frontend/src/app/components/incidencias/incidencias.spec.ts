import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Incidencias } from './incidencias';

describe('Incidencias', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [Incidencias],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    expect(TestBed.createComponent(Incidencias).componentInstance).toBeTruthy();
  });

  it('shows incidencias after the initial request without another interaction', async () => {
    await TestBed.configureTestingModule({
      imports: [Incidencias],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const fixture = TestBed.createComponent(Incidencias);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    http.expectOne('http://localhost:8080/api/incidencias').flush([
      { id: 2, titulo: 'Acceso', descripcion: 'No inicia sesion', estado: 'PENDIENTE' },
    ]);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Acceso');
    expect(fixture.nativeElement.textContent).toContain('PENDIENTE');
    http.verify();
  });
});
