# OrionTek CRM - Prueba Técnica

Este proyecto es una solución informática desarrollada para la prueba técnica de **OrionTek**.

## Descripción del Problema
Se desea tener el control de todos los clientes pertenecientes a la empresa OrionTek donde cada cliente puede tener N cantidad de direcciones. Con sus conocimientos de desarrollo se solicita crear una solución informática para este problema.

## Tecnologías Utilizadas

El proyecto utiliza un stack moderno enfocado en el rendimiento y la experiencia del desarrollador:

- **Core:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Estado y Fetching:** [TanStack Query v5](https://tanstack.com/query/latest) (React Query)
- **Formularios:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) (Validación)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Internacionalización:** [i18next](https://www.i18next.com/)
- **UI Components:** Radix UI + Lucide React + Sonner (Notificaciones)
- **Calidad de Código:** [Biome](https://biomejs.dev/) (Linting y Formateo)
- **Testing:** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Sobre Biome
Para este proyecto se ha integrado **Biome** como herramienta unificada de linting y formateo. Biome es una alternativa extremadamente rápida a ESLint y Prettier que permite mantener un estándar de código consistente con una configuración simplificada y un rendimiento superior.

## Estructura de Carpetas

```text
src/
├── __tests__/      # Pruebas unitarias y de integración
├── components/     # Componentes de UI reutilizables
├── constants/      # Constantes globales del proyecto
├── hooks/          # Hooks personalizados
├── layouts/        # Componentes de diseño (Sidebar, Navbar, etc.)
├── lib/            # Configuraciones de librerías externas (API clients)
├── locales/        # Archivos de traducción (i18n)
├── pages/          # Páginas principales de la aplicación
├── providers/      # Proveedores de contexto (QueryClient, Theme, etc.)
├── routes/         # Configuración de rutas
├── schemas/        # Esquemas de validación de Zod
├── services/       # Capa de servicios para peticiones API
├── types/          # Definiciones de tipos TypeScript
└── utils/          # Funciones de utilidad general
```

## Configuración y Ejecución

Sigue estos pasos para levantar el proyecto localmente:

### 1. Clonar el repositorio
```bash
git clone https://github.com/JE1999/oriontek-crm-test
cd oriontek-crm-test
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Levantar el servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera el build de producción.
- `npm run lint`: Ejecuta el linter de Biome.
- `npm run format`: Formatea el código usando Biome.
- `npm run check`: Ejecuta linting y formateo simultáneamente con Biome.
- `npm run test`: Ejecuta las pruebas unitarias con Vitest.
- `npm run test:ui`: Inicia la interfaz visual de Vitest.

