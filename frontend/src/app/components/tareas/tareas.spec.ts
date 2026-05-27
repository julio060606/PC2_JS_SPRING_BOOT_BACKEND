import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Tareas } from './tareas';

describe('Tareas', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [Tareas],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    expect(TestBed.createComponent(Tareas).componentInstance).toBeTruthy();
  });

  it('shows tareas after the initial request without another interaction', async () => {
    await TestBed.configureTestingModule({
      imports: [Tareas],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const fixture = TestBed.createComponent(Tareas);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    http.expectOne('http://localhost:8080/api/tareas').flush([
      { id: 4, titulo: 'Preparar entrega', descripcion: 'Validar pantallas', completada: false },
    ]);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Preparar entrega');
    expect(fixture.nativeElement.textContent).toContain('Pendiente');
    http.verify();
  });
});
