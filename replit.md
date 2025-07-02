# Helpdesk Ticketing System

## Overview

This is a full-stack helpdesk ticketing system built with React on the frontend and Express on the backend. The application provides a comprehensive solution for managing support tickets with features like ticket creation, tracking, approval workflows, and performance analytics. The system uses a modern tech stack with TypeScript throughout, shadcn/ui components for the interface, and is configured for both development and production deployment.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query for server state, local state with React hooks
- **Form Management**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod schemas shared between frontend and backend
- **Session Management**: Prepared for PostgreSQL session storage
- **Development**: Hot reload with tsx

## Key Components

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Centralized schema definitions in `shared/schema.ts`
- **Tables**: Users and tickets with proper relationships
- **Migrations**: Managed through Drizzle Kit
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development

### Authentication & Authorization
- **Simple Authentication**: Email/password based login system
- **Client-side Storage**: LocalStorage for session persistence
- **Protected Routes**: Route protection component for authenticated access
- **Role-based Access**: Support for different user roles (Support Agent, etc.)

### UI Components
- **Component Library**: Comprehensive shadcn/ui components
- **Layout System**: Responsive sidebar and topbar navigation
- **Forms**: Validated form components with error handling
- **Data Display**: Tables, cards, and stats components
- **Feedback**: Toast notifications and loading states

### Data Management
- **Client Storage**: LocalStorage for tickets and user data during development
- **Service Layer**: Abstracted services for tickets and authentication
- **Type Safety**: Full TypeScript coverage with shared types
- **Validation**: Zod schemas for data validation across the stack

## Data Flow

1. **Authentication Flow**: User logs in → credentials validated → user data stored locally → protected routes accessible
2. **Ticket Creation**: User fills form → data validated → ticket stored locally → user redirected to tickets list
3. **Data Persistence**: Currently using localStorage for development, prepared for PostgreSQL integration
4. **State Management**: Local state for UI, service layer for business logic, TanStack Query for server state

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI Library**: Radix UI primitives, Lucide icons
- **Styling**: Tailwind CSS, class-variance-authority
- **Utilities**: date-fns, clsx, nanoid
- **Development**: Vite, TypeScript

### Backend Dependencies
- **Server**: Express.js, cors middleware
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Validation**: Zod for schema validation
- **Development**: tsx for hot reload, esbuild for production builds

### Development Tools
- **Build System**: Vite with React plugin
- **Type Checking**: TypeScript with strict configuration
- **Linting**: Configured for TypeScript and React
- **Development Server**: Integrated Vite dev server with Express

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with hot module replacement
- **Backend**: tsx for TypeScript execution with auto-restart
- **Database**: Ready for PostgreSQL connection via DATABASE_URL
- **Environment**: Development-specific configurations and error overlays

### Production
- **Build Process**: Vite builds frontend to `dist/public`, esbuild bundles backend to `dist/`
- **Server**: Node.js serves static files and API routes
- **Database**: PostgreSQL with Drizzle migrations
- **Deployment**: Single build command creates production-ready artifacts

### Environment Configuration
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Static Files**: Frontend build served from Express in production
- **API Routes**: Prefixed with `/api` for clear separation
- **Session Storage**: PostgreSQL-based session management ready for production

## Changelog

```
Changelog:
- July 02, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```