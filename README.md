# Google Books Explorer · Ionic + Angular Standalone (DAM2)

Aplicación Single Page Application (SPA) desarrollada con **Angular 22 Standalone** e **Ionic 9 Framework**, basada en la práctica de DAM2 de **Desarrollo de Interfaces**. La aplicación ha sido mutada desde la API original de productos para consumir directamente la **Google Books REST API**.

---

## 🚀 Características Principales

1. **Arquitectura 100% Standalone**:
   - Sin `app.module.ts`. Toda la aplicación se inicializa mediante `bootstrapApplication` y `app.config.ts`.
   - Inyección de dependencias moderna mediante la función `inject()` de Angular tanto en servicios (`BookService`) como en componentes (`InicioPage`, `LibrosPage`).
   - Uso exclusivo del **nuevo control flow nativo de Angular** (`@if`, `@else if`, `@else`, `@for ... track`). No se utilizan directivas legadas (`*ngIf`, `*ngFor`).
   - Importaciones granulares de componentes Ionic desde `@ionic/angular/standalone`.

2. **Integración con Google Books REST API y Métricas de Negocio**:
   - Endpoint: `https://www.googleapis.com/books/v1/volumes` con soporte de búsqueda y paginación (`startIndex`, `maxResults`).
   - Modelo de datos fuertemente tipado en `src/app/models/book.model.ts` (`GoogleBooksResponse`, `BookItem`, `BookDimensions`).
   - Dimensiones físicas añadidas al catálogo (`width` y `height` en cm).
   - Métricas comerciales integradas: `stock` (unidades), `price` (PVP en €), `discountPercentage` (% de descuento) y **Stock Valorado Total**:
     $$\text{Stock Valorado} = (\text{unidades} \times \text{precio}) - \left(\text{unidades} \times \text{precio} \times \frac{\text{descuento}}{100}\right)$$
   - Manejo defensivo de errores HTTP y sistema de fallback offline integrado en caso de cuota excedida (HTTP 429 Too Many Requests).

3. **Vistas & Navegación SPA**:
   - `/` $\rightarrow$ Redirige a `/inicio`.
   - `/inicio` $\rightarrow$ Página de bienvenida con Hero UI moderno, dos botones principales hacia `/productos` y `/about`, badges de arquitectura y accesos directos.
   - `/productos` (y alias `/libros`) $\rightarrow$ Catálogo completo con buscador, chips temáticos, tabla de productos, métricas de stock valorado, paginación completa y botones visibles de retorno a Inicio.
   - `/about` $\rightarrow$ Página corporativa de la consultora de desarrollo software DAM2 con reseña técnica, métricas, competencias y tarjeta oficial hacia el perfil de GitHub ([@thepimen](https://github.com/thepimen)).
   - `**` $\rightarrow$ Redirige a `/inicio`.

4. **Paginación Dinámica e Interactiva**:
   - Paginación soportada de extremo a extremo (servicio `BookService`, controlador `LibrosPage` y vista HTML/SCSS).
   - Rango visible: "Mostrando X - Y de Z productos" con cálculo dinámico de `totalPages`.
   - Botones "Anterior" y "Siguiente" con iconos y selector numérico de páginas con realce visual.

5. **Selector Modo Oscuro / Modo Claro (Dark/Light Theme Toggle)**:
   - Servicio reactivo `ThemeService` con Angular Signals y persistencia en `localStorage`.
   - Detección automática de preferencia del sistema (`prefers-color-scheme`).
   - Botón toggle accesible en la barra superior de todas las vistas con iconos sol/luna (`sunny-outline` / `moon-outline`).
   - Transiciones suaves y alto contraste en tabla, tarjetas y componentes.

6. **Soporte para Despliegue en Vercel**:
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
    ├── main.ts                 # Bootstrap de la aplicación con appConfig y zone.js
    ├── global.scss             # Estilos globales, paleta oscura y scrollbars
    └── app/
        ├── app.config.ts       # provideHttpClient(), provideRouter(), provideIonicAngular()
        ├── app.routes.ts       # Rutas SPA (/inicio, /productos, /libros, /about, **)
        ├── app.component.ts    # Componente raíz con registro de ionicons
        ├── docs/
        │   └── technical-notes.md # Documento técnico de arquitectura y troubleshooting
        ├── models/
        │   └── book.model.ts   # Interfaces TypeScript para Google Books API y negocio
        ├── services/
        │   └── book.service.ts # Servicio singleton reactivo con paginación y contingencia
        └── pages/
            ├── inicio/         # Vista Hero UI (/inicio) con accesos a productos y about
            ├── libros/         # Vista Catálogo, tabla valorada y paginación (/productos)
            └── about/          # Vista Corporativa DAM2 y enlace a GitHub (/about)
```

---

## 📚 Documentación Técnica y Troubleshooting

Para consultar el análisis exhaustivo de arquitectura e incidencias resueltas, consulta el archivo:
👉 **[`src/app/docs/technical-notes.md`](src/app/docs/technical-notes.md)**

### Resumen de Incidencias Documentadas:
1. **¿Por qué existe `app.config.ts`?**: Reemplazo oficial de `AppModule` en Angular Standalone mediante `ApplicationConfig`, centralizando funciones proveedoras tree-shakeable (`provideHttpClient()`, `provideRouter()`, `provideIonicAngular()`).
2. **Subpath de importación en `@ionic/angular/standalone`**: Resuelto mediante script automatizado `scripts/setup-ionic-exports.js` en `postinstall` y mapeo en `tsconfig.json`.
3. **Error `NG0908 Zone.js Required`**: Resuelto con la integración de `zone.js` en `polyfills` de `angular.json` e importación en `main.ts` para soportar `IonRouterOutlet`.
4. **Saturación de cuota HTTP 429 en Google Books API**: Resuelto mediante operador RxJS `catchError` con catálogo curado tipado y forzado de detección de cambios con `ChangeDetectorRef`.
5. **Flujo de Integración Profesional Git (de `desarrollo` a `main`)**: Justificación de `main` como rama de producción en Vercel vs `desarrollo` para staging/preview, con guía paso a paso de comandos de terminal para merge y push.

---

## 💻 Instrucciones de Ejecución

### 1. Iniciar servidor de desarrollo local
```bash
npm start
```
La aplicación estará disponible en `http://localhost:4200/`.

### 2. Compilar bundle de producción
```bash
npm run build
```
Genera los archivos optimizados en la carpeta `www/`.

### 3. Despliegue en Vercel
Simplemente vincula el repositorio en Vercel o ejecuta:
```bash
npx vercel
```
Vercel detectará el archivo `vercel.json` y desplegará la SPA redirigiendo todas las rutas a `index.html`.
