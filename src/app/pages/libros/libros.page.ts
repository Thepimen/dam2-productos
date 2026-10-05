import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  IonSearchbar,
  IonChip,
  IonLabel,
} from '@ionic/angular/standalone';
import { BookService } from '../../services/book.service';
import { BookItem } from '../../models/book.model';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.page.html',
  styleUrls: ['./libros.page.scss'],
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    IonSearchbar,
    IonChip,
    IonLabel,
  ],
})
export class LibrosPage implements OnInit {
  private readonly bookService = inject(BookService);
  private readonly cdr = inject(ChangeDetectorRef);

  // Estados de la vista
  books: BookItem[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  totalItems: number = 0;
  currentQuery: string = 'software engineering';

  // Temas sugeridos para filtrado rápido
  readonly filterTopics: string[] = [
    'Software Engineering',
    'Angular',
    'TypeScript',
    'Clean Code',
    'Artificial Intelligence',
    'Cybersecurity',
  ];

  // Fallback SVG data URI para portadas nulas o rotas
  readonly placeholderImage =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="128" height="180" viewBox="0 0 128 180" fill="%231e2130"><rect width="100%" height="100%" fill="%231a1d29"/><path d="M40 50h48M40 70h48M40 90h30" stroke="%234285f4" stroke-width="4" stroke-linecap="round"/><circle cx="64" cy="130" r="14" fill="%2334a853" opacity="0.4"/><text x="50%" y="160" text-anchor="middle" fill="%239aa0a6" font-family="sans-serif" font-size="10">Sin portada</text></svg>';

  ngOnInit(): void {
    this.cargarLibros(this.currentQuery);
  }

  /**
   * Ejecuta la petición al servicio con manejo reactivo de estados
   */
  cargarLibros(query: string = this.currentQuery): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.currentQuery = query;
    this.cdr.markForCheck();

    this.bookService.getBooks(query).subscribe({
      next: (response) => {
        this.books = response.items || [];
        this.totalItems = response.totalItems || this.books.length;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: Error) => {
        this.errorMessage = err.message || 'Error al conectar con Google Books API.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  /**
   * Reintenta la carga tras un fallo
   */
  reintentar(): void {
    this.cargarLibros(this.currentQuery);
  }

  /**
   * Búsqueda disparada desde el searchbar
   */
  onSearch(event: CustomEvent): void {
    const value = (event.detail.value || '').trim();
    if (value && value !== this.currentQuery) {
      this.cargarLibros(value);
    } else if (!value) {
      this.cargarLibros('software engineering');
    }
  }

  /**
   * Selecciona una temática de los chips
   */
  seleccionarFiltro(tema: string): void {
    if (this.currentQuery !== tema) {
      this.cargarLibros(tema);
    }
  }

  /**
   * Reemplaza imágenes caídas con el fallback SVG
   */
  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    if (imgElement && imgElement.src !== this.placeholderImage) {
      imgElement.src = this.placeholderImage;
    }
  }

  /**
   * Genera un array numérico para pintar estrellas de calificación
   */
  getStars(rating?: number): number[] {
    const score = Math.round(rating || 0);
    return Array.from({ length: 5 }, (_, i) => (i < score ? 1 : 0));
  }

  /**
   * Extrae el año o fecha formateada
   */
  formatDate(dateStr?: string): string {
    if (!dateStr) return 'Fecha desc.';
    return dateStr.length >= 4 ? dateStr.substring(0, 4) : dateStr;
  }

  /**
   * Implementa la fórmula de negocio del cliente para calcular el stock valorado:
   * Stock Valorado = (unidades * precio) - descuento aplicable
   * donde descuento aplicable = unidades * precio * (descuento / 100)
   */
  calcularStockValorado(book: BookItem): number {
    const unidades = book.stock ?? 0;
    const precioUnitario = book.price ?? 0;
    const porcentajeDescuento = book.discountPercentage ?? 0;

    const baseBruta = unidades * precioUnitario;
    const descuentoAplicable = baseBruta * (porcentajeDescuento / 100);

    return baseBruta - descuentoAplicable;
  }
}
