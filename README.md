# EnterpriseHub PWA 🚀

> **Sistema de Gestión Multiplataforma B2B**  
> Monitorización de Infraestructura y Tickets Técnicos en Tiempo Real

[![Angular](https://img.shields.io/badge/Angular-22.x-red?logo=angular)](https://angular.io)
[![Ionic](https://img.shields.io/badge/Ionic-9.x-blue?logo=ionic)](https://ionicframework.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-blue?logo=typescript)](https://www.typescriptlang.org)
[![WCAG](https://img.shields.io/badge/WCAG-2.1%20AA-green)](https://www.w3.org/WAI/WCAG21/quickref/)
[![License](https://img.shields.io/badge/License-Academic-orange)](./LICENSE)

---

## 📋 Información Académica

| Campo | Detalle |
|-------|---------|
| **Alumno** | Luis López |
| **Módulo** | Desarrollo de Interfaces (Código 0488) |
| **Grado** | Técnico Superior en DAM (Grado Superior) |
| **Centro** | Universidad Nebrija |
| **Curso** | 2025-2026 |

---

## 🔑 Credenciales de Acceso (Demo)

> ⚠️ **IMPORTANTE**: Usa estos accesos rápidos en la pantalla de Login para demostración

### 👑 Administrador (Acceso Total)
| Campo | Valor |
|-------|-------|
| **Email** | `admin@enterprise.io` |
| **Contraseña** | `Admin123!` |
| **Rol** | `ADMIN` |
| **Acceso** | Dashboard + Tickets + Ayuda |

### 👤 Usuario Operaciones (Acceso Restringido)  
| Campo | Valor |
|-------|-------|
| **Email** | `user@enterprise.io` |
| **Contraseña** | `User123!` |
| **Rol** | `USER` |
| **Acceso** | Tickets + Ayuda (Dashboard bloqueado por RoleGuard) |

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| **Ionic Framework** | 9.x | UI Components, PWA |
| **Angular** | 22.x | Framework SPA, Standalone Components |
| **TypeScript** | 6.x | Tipado estático estricto |
| **RxJS** | 7.8.x | BehaviorSubject, forkJoin, debounceTime |
| **Chart.js** | 4.x | Gráficos de barras y Doughnut |
| **jsPDF + autotable** | 2.5.x / 3.8.x | Exportación PDF profesional |
| **@compodoc/compodoc** | 1.1.x | Documentación técnica |
| **Vercel** | — | Despliegue y hosting |

---

## 📁 Arquitectura del Proyecto

```
src/app/
├── core/
│   ├── models/
│   │   ├── auth.model.ts          # User, UserRole, AuthState
│   │   ├── ticket.model.ts        # Ticket, CreateTicketPayload, TableColumn
│   │   └── metric.model.ts        # ServerMetric, SummaryMetrics, LiveMetrics
│   ├── services/
│   │   ├── auth.service.ts        # BehaviorSubject<AuthState>, login, logout
│   │   ├── sql-mock.service.ts    # API REST simulada (300ms delay)
│   │   ├── nosql-mock.service.ts  # Métricas en tiempo real (BehaviorSubject + interval)
│   │   ├── export.service.ts      # CSV (Blob nativo) + PDF (jspdf-autotable)
│   │   └── notification.service.ts # Toasts accesibles (Ionic)
│   └── guards/
│       ├── auth.guard.ts           # Rutas autenticadas (functional guard)
│       └── role.guard.ts           # Solo ADMIN (functional guard)
├── shared/
│   └── components/
│       ├── data-table/             # Tabla reutilizable (OnPush, filtro, paginación)
│       └── metric-card/            # Widget KPI (OnPush, tendencias, ARIA)
├── pages/
│   ├── login/                      # Formulario reactivo + quick demo buttons
│   ├── register/                   # Validador asíncrono uniqueEmailValidator
│   ├── dashboard/                  # forkJoin + Chart.js + exportar PDF/CSV
│   ├── tickets/                    # DataTable + modal crear ticket
│   └── help/                       # Manual embebido + arquitectura
├── app.component.ts                # Root component (ion-app + router-outlet)
├── shell.component.ts              # Layout con ion-split-pane + ion-menu
├── app.routes.ts                   # Lazy Loading + authGuard + roleGuard
├── app.config.ts                   # Providers Angular/Ionic standalone
└── theme/
    └── variables.scss              # Design tokens WCAG AA/AAA verificados
```

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **Angular CLI** ≥ 17.x (opcional)

### Pasos

```bash
# 1. Clonar el repositorio
git clone <url-repositorio>
cd ionicAngular

# 2. Instalar dependencias
npm install

# 3. Servidor de desarrollo
npm start
# → Abre automáticamente en http://localhost:4200

# 4. Build de producción
npm run build:prod
# → Genera carpeta dist/ionic-angular/browser/
```

---

## 📖 Documentación con Compodoc

Compodoc genera documentación técnica automática del código TypeScript.

```bash
# Generar y servir documentación (modo servidor)
npm run compodoc
# → Abre en http://localhost:8080

# Solo generar (sin servidor)
npm run compodoc:build
# → Genera en docs/compodoc/
```

**¿Qué documenta Compodoc?**
- ✅ Todos los componentes con sus `@Input` y `@Output`
- ✅ Todos los servicios con sus métodos públicos
- ✅ Interfaces y modelos TypeScript
- ✅ Guards y pipes
- ✅ Cobertura de documentación JSDoc

---

## ☁️ Despliegue en Vercel

### Opción 1: Vercel CLI (Recomendado)

```bash
# 1. Instalar Vercel CLI globalmente
npm install -g vercel

# 2. Autenticar con Vercel
vercel login

# 3. Build de producción
npm run build:prod

# 4. Desplegar (primera vez - configura proyecto)
vercel --prod

# 5. Despliegues posteriores
vercel --prod
```

### Opción 2: Conectar con GitHub

1. Push al repositorio GitHub
2. Ir a [vercel.com](https://vercel.com) → New Project
3. Importar el repositorio
4. Configurar:
   - **Build Command**: `npm run build:prod`
   - **Output Directory**: `dist/ionic-angular/browser`
5. Deploy

> El archivo `vercel.json` ya está configurado para evitar errores 404 al recargar en rutas SPA.

---

## 🌿 Git Flow Recomendado

```
main                    # Rama de producción (Vercel auto-deploy)
└── develop             # Integración de features
    ├── feature/auth            # Autenticación y guards
    ├── feature/dashboard       # Dashboard y gráficos
    ├── feature/tickets         # Gestión de tickets
    ├── feature/data-table      # Componente reutilizable
    ├── feature/accessibility   # Mejoras WCAG
    └── hotfix/                 # Correcciones urgentes sobre main
```

### Convención de commits
```
feat(dashboard): add forkJoin parallel data loading
fix(auth): restore session from localStorage on reload
style(theme): update WCAG AA contrast ratios
docs(readme): add deployment guide
test(data-table): add unit tests for filter logic
```

---

## ♿ Accesibilidad (WCAG 2.1 AA/AAA)

| Criterio | Implementación |
|----------|---------------|
| **1.4.3 Contraste** | Ratio mínimo 4.5:1 en texto. Verificado con WebAIM. |
| **1.4.4 Redimensionar texto** | Diseño responsive sin scroll horizontal hasta 320px. |
| **2.1.1 Teclado** | Navegación Tab/Enter/Space en todos los interactivos. |
| **2.4.3 Orden foco** | Orden lógico de tabulación en todos los formularios. |
| **2.4.7 Foco visible** | :focus-visible con outline 3px en todos los elementos. |
| **3.1.1 Idioma** | `lang="es"` en `<html>`. |
| **3.3.1 Error identificado** | `role="alert"` + `aria-live="assertive"` en errores. |
| **4.1.2 Nombre/Función** | `aria-label`, `aria-describedby`, `aria-current` en todos los elementos interactivos. |
| **Tablas** | `role="grid"`, `role="columnheader"`, `<caption>` en DataTable. |
| **Movimiento** | `prefers-reduced-motion` respetado. |

---

## 🔄 Patrones RxJS Implementados

| Patrón | Servicio/Componente | Descripción |
|--------|--------------------|----|
| `BehaviorSubject` | `AuthService` | Estado global de autenticación |
| `forkJoin` | `DashboardPage` | Carga paralela SQL + NoSQL |
| `debounceTime(300)` | `DataTableComponent` | Búsqueda reactiva sin bloqueo |
| `debounceTime(300)` | `RegisterPage` | Validador asíncrono email |
| `switchMap` | `RegisterPage` | Cancelación de peticiones email |
| `distinctUntilChanged` | `DataTableComponent` | Evita búsquedas duplicadas |
| `takeUntil` | Todas las páginas | Gestión de suscripciones |
| `interval` | `NoSqlMockService` | Actualización periódica 5s |
| `shareReplay(1)` | `NoSqlMockService` | Caché del último valor |

---

## 📊 Estructura de Datos Mock

### Usuarios del Sistema
- `admin@enterprise.io` → Rol ADMIN
- `user@enterprise.io` → Rol USER

### Tickets (10 preconfigurados)
- Estados: OPEN, IN_PROGRESS, RESOLVED, CLOSED
- Prioridades: LOW, MEDIUM, HIGH, CRITICAL
- Categorías: HARDWARE, SOFTWARE, NETWORK, SECURITY, OTHER

### Servidores Monitorizados (12)
- WEB-SRV-01/02, DB-PRIMARY/REPLICA, APP-SRV-01/02
- CACHE-01, BACKUP-SRV, PROXY-01, MONITOR-SRV, MAIL-SRV, VPN-GW

---

## 📄 Licencia

Proyecto académico para evaluación del módulo **Desarrollo de Interfaces (0488)**  
**Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)**  
Universidad Nebrija — Curso 2025-2026

---

*Desarrollado con ❤️ y TypeScript estricto por Luis López*
