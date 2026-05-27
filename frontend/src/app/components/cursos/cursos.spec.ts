import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Cursos } from './cursos';

describe('Cursos', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [Cursos],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    expect(TestBed.createComponent(Cursos).componentInstance).toBeTruthy();
  });

  it('shows cursos after the initial request without another interaction', async () => {
    await TestBed.configureTestingModule({
      imports: [Cursos],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const fixture = TestBed.createComponent(Cursos);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    http.expectOne('http://localhost:8080/api/cursos').flush([
      {
        id: 3,
        nombre: 'Angular inicial',
        descripcion: 'Curso de prueba',
        cupos: 10,
        cuposDisponibles: 9,
        matriculados: [],
      },
    ]);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Angular inicial');
    expect(fixture.nativeElement.textContent).toContain('Cupos disponibles');
    http.verify();
  });
});
