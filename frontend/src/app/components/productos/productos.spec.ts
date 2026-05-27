import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductosComponent } from './productos';

describe('ProductosComponent', () => {
  it('should create', async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    expect(TestBed.createComponent(ProductosComponent).componentInstance).toBeTruthy();
  });

  it('shows productos after the initial request without another interaction', async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductosComponent);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    http.expectOne('http://localhost:8080/api/productos').flush([
      { id: 1, nombre: 'Teclado', precio: 80, stock: 3 },
    ]);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Teclado');
    http.verify();
  });
});
