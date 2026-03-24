# National Pet Registry – Frontend

An Angular-based web application for managing the national pet registry (REMITK).

---

## Technologies

- Angular 21 (standalone components, no NgModules)
- TypeScript
- SCSS
- RxJS
- Angular Reactive Forms

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Angular CLI (`npm install -g @angular/cli`)
- Backend must be running at `http://localhost:8080`

### Running the app

```bash
npm install --legacy-peer-deps
ng serve
```

The app will be available at `http://localhost:4200`.

### API proxy

All `/api` requests are proxied to the backend (`http://localhost:8080`).
If the proxy is not configured, update the base URL directly in the service files:

```ts
private readonly base = 'http://localhost:8080/api/...';
```

---

## Project Structure

```
src/app/
├── components/
│   ├── dashboard/                        # Main layout component (navbar + router-outlet)
│   ├── dashboard-home/                   # Role-based home view
│   ├── login/                            # Login page
│   ├── user-form/                        # User registration
│   ├── pet-form/                         # New pet registration
│   ├── pet-transfer/                     # Ownership transfer
│   ├── add-microchip/                    # Microchip management
│   └── pets/
│       ├── pet-list/                     # Owner's pet list
│       └── pet-report/pet-report/        # Pet status management
├── services/
│   ├── auth.ts                           # Authentication and user management
│   ├── pet.service.ts                    # Pet API calls
│   ├── pet-transfer.ts                   # Ownership transfer API calls
│   ├── microchip.service.ts              # Microchip API calls
│   └── user.service.ts                   # User API calls
├── guards/
│   └── auth-guard.ts                     # Protects dashboard routes from unauthenticated users
├── interceptors/
│   └── auth.interceptor.ts               # Active role is sent with each request via the `X-Active-Role` header
└── models/
    ├── pet.model.ts
    ├── breed.model.ts
    ├── species.model.ts
    ├── microchip.model.ts
    ├── role.model.ts
    └── user.model.ts
```

---

## User Roles

### OWNER
- Views their own pet list
- Marks a pet as lost or deceased
- Initiates an ownership transfer to another owner
- Accepts or declines incoming ownership transfer requests

### VET (Veterinarian)
- Registers new pets (with microchip validation)
- Manages microchips (add, update status)
- Views the full list of all registered pets

### ADMIN
- Registers new pets
- Manages microchips
- Manages users (add, edit)

---

## Key Features

### Authentication
- Login with personal code and password
- Basic Auth credentials are stored and automatically attached to all API requests via HTTP interceptor
- Auth guard protects all dashboard routes — unauthenticated users are redirected to `/login`

### Ownership Transfer
- Owner selects a pet from their list and clicks "Vaheta omanikku"
- Enters the new owner's user ID
- System creates a transfer request with `PENDING` status
- New owner can accept (`COMPLETED`) or decline (`REJECTED`) the request
- Old owner can cancel (`CANCELLED`) the request before it is resolved

### Pet Management
- Mark a pet as lost or deceased directly from the pet card
- Pet status displayed on each card

### Validation
- Personal code: exactly 11 digits
- Phone number: only digits and `+`, spaces are not allowed
- All required fields are validated before form submission

---

## Technical Decisions

- **Standalone components** — uses the new Angular standalone approach without NgModules, simplifying the project structure and reducing boilerplate
- **Reactive Forms** — used with `FormBuilder` and `Validators` for robust form state and validation management
- **ChangeDetectorRef** — added to components where Angular does not automatically detect changes (HTTP callbacks)
- **Route-based navigation** — ownership transfer runs on a dedicated page, navigated to with a `petId` URL parameter (`/dashboard/ownership-transfer/:petId`)
- **HTTP Interceptor** — auth token is automatically added to all outgoing requests

---

## Future Improvements

- Search new owner by personal code instead of user ID
- In-app or email notifications for ownership transfer status changes
- Pet image upload support
- Shelter module for managing stray animals
- Additional filtering and sorting options in pet lists
- Unit and integration tests