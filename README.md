# Google Books Explorer · Ionic + Angular Standalone (DAM2)

Aplicación Single Page Application (SPA) desarrollada con **Angular 22 Standalone** e **Ionic 9 Framework**, basada en la práctica de DAM2 de **Desarrollo de Interfaces**. La aplicación ha sido mutada desde la API original de productos para consumir directamente la **Google Books REST API**.

---

## 🚀 Características Principales

1. **Arquitectura 100% Standalone**:
   - Sin `app.module.ts`. Toda la aplicación se inicializa mediante `bootstrapApplication` y `app.config.ts`.
   - Inyección de dependencias moderna mediante la función `inject()` de Angular tanto en servicios (`BookService`) como en componentes (`InicioPage`, `LibrosPage`).
   - Uso exclusivo del **nuevo control flow nativo de Angular** (`@if`, `@else if`, `@else`, `@for ... track`). No se utilizan directivas legadas (`*ngIf`, `*ngFor`).
   - Importaciones granulares de componentes Ionic desde `@ionic/angular/standalone`.

2. **Integración con Google Books REST API**:
   - Endpoint: `https://www.googleapis.com/books/v1/volumes` con parámetros de búsqueda y límite de resultados.
   - Modelo de datos fuertemente tipado en `src/app/models/book.model.ts` (`GoogleBooksResponse`, `BookItem`, `BookVolumeInfo`).
   - Sanitización de URLs de portadas para forzar HTTPS evitando avisos de *Mixed Content*.
   - Manejo defensivo de errores HTTP y sistema de fallback offline integrado en caso de cuota excedida (HTTP 429 Too Many Requests).

3. **Vistas & Navegación SPA**:
   - `/` $\rightarrow$ Redirige a `/inicio`.
   - `/inicio` $\rightarrow$ Página de bienvenida con Hero UI moderno, diseño *Google Clean/Dark*, badges de arquitectura y llamada a la acción hacia el catálogo.
   - `/libros` (y alias `/productos`) $\rightarrow$ Catálogo completo con buscador, chips temáticos, contador de libros en tiempo real y botón de retroceso `<ion-back-button defaultHref="/inicio">`.
   - `**` $\rightarrow$ Redirige a `/inicio`.

4. **Gestión Completa de Estados en el Catálogo**:
   - **Estado Loading**: Spinner centrado con animación y texto informativo.
   - **Estado Error**: Tarjeta con detalles del error, botón de reintento interactivo y acceso a catálogo demo offline.
   - **Estado Éxito**: Tabla interactiva responsive con scroll horizontal suave, sticky header, hover en filas y miniaturas con fallback SVG automático para imágenes nulas o rotas.

5. **Soporte para Despliegue en Vercel**:
   - Archivo `vercel.json` en la raíz con reglas de reescritura hacia `/index.html` para evitar errores 404 al recargar rutas directas en producción.

---

## 🛠️ Estructura del Proyecto

```text
├── vercel.json                 # Configuración de routing SPA para Vercel
├── angular.json                # Configuración de Angular CLI y budgets
├── package.json                # Dependencias (Angular 22, Ionic 9, Capacitor 8)
├── scripts/
│   └── setup-ionic-exports.js  # Script de compatibilidad para standalone exports
└── src/
    ├── index.html              # Tipografía Google Fonts (Plus Jakarta Sans & Inter)
    ├── main.ts                 # Bootstrap de la aplicación con appConfig
    ├── global.scss             # Estilos globales, paleta oscura y scrollbars
    └── app/
        ├── app.config.ts       # provideHttpClient(), provideRouter(), provideIonicAngular()
        ├── app.routes.ts       # Rutas SPA (/inicio, /libros, /productos, **)
        ├── app.component.ts    # Componente raíz con registro de ionicons
        ├── models/
        │   └── book.model.ts   # Interfaces TypeScript para Google Books API
        ├── services/
        │   └── book.service.ts # Servicio singleton reactivo con inject(HttpClient)
        └── pages/
            ├── inicio/         # Vista Hero UI (/inicio)
            └── libros/         # Vista Catálogo con tabla responsive (/libros)
```

---

## 💻 Instrucciones de Ejecución

### 1. Iniciar servidor de desarrollo local
```bash
npm start
```
La aplicación estará disponible en `http://localhost:4200/`.

### 2. Compilar para producción
```bash
npm run build
```
Generará el bundle optimizado en la carpeta `www/`.

### 3. Despliegue en Vercel
Simplemente vincula el repositorio en Vercel o ejecuta:
```bash
npx vercel
```
Vercel detectará el archivo `vercel.json` y desplegará la SPA redirigiendo todas las rutas a `index.html`.
