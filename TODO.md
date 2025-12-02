# MiniBus API - Development TODO

## 🎯 Customer Features

### Authentication & Account Management

- [ ] **UC1: Register Account**
  - [ ] POST /auth/register endpoint
  - [ ] Email validation
  - [ ] Password hashing
  - [ ] User creation in database

- [ ] **UC2: Login**
  - [ ] POST /auth/login endpoint
  - [ ] JWT token generation
  - [ ] Password verification
  - [ ] Role-based authentication

### Trip Management

- [ ] **UC3: Browse Available Trips**
  - [ ] GET /trips endpoint
  - [ ] Filter by origin/destination
  - [ ] Date range filtering
  - [ ] Available seats display

- [ ] **UC4: Select Trip & Seat**
  - [ ] Seat selection logic
  - [ ] Real-time seat availability
  - [ ] Seat conflict prevention

### Booking Management

- [ ] **UC5: Create Booking**
  - [ ] POST /bookings endpoint
  - [ ] Seat availability validation
  - [ ] Booking confirmation
  - [ ] Status management (pending/confirmed)

- [ ] **UC7: View My Bookings**
  - [ ] GET /bookings endpoint (user-specific)
  - [ ] Booking history
  - [ ] Status filtering

- [ ] **UC8: Cancel Booking**
  - [ ] PATCH /bookings/:id endpoint
  - [ ] Cancellation logic
  - [ ] Seat release mechanism

### File Management

- [ ] **UC6: Upload Attachment**
  - [ ] POST /files endpoint
  - [ ] File validation (type, size)
  - [ ] Storage implementation
  - [ ] File metadata tracking

## 👨‍💼 Staff Features

### Trip Administration

- [ ] **UC9: Manage Trips**
  - [ ] Staff authentication middleware
  - [ ] Trip management dashboard access

- [ ] **UC10: Create New Trip**
  - [ ] POST /trips endpoint
  - [ ] Route validation
  - [ ] Schedule conflict checking
  - [ ] Pricing setup

- [ ] **UC11: Update Trip Details**
  - [ ] PATCH /trips/:id endpoint
  - [ ] Existing booking impact validation
  - [ ] Schedule modification logic

- [ ] **UC12: Delete Trip**
  - [ ] DELETE /trips/:id endpoint
  - [ ] Booking cancellation handling
  - [ ] Soft delete implementation

### Booking Administration

- [ ] **UC13: Manage Bookings**
  - [ ] Staff booking management access
  - [ ] Bulk operations support

- [ ] **UC14: View All Bookings**
  - [ ] GET /bookings endpoint (all users)
  - [ ] Advanced filtering options
  - [ ] Export functionality

- [ ] **UC15: Update Booking Status**
  - [ ] PATCH /bookings/:id/status endpoint
  - [ ] Status transition validation
  - [ ] Notification system

- [ ] **UC16: Handle Booking Issues**
  - [ ] Issue resolution workflow
  - [ ] Customer communication tools
  - [ ] Refund processing

### File Administration

- [ ] **UC17: Manage Files**
  - [ ] Staff file management access
  - [ ] File moderation tools

- [ ] **UC18: View User Files**
  - [ ] GET /files endpoint (all users)
  - [ ] File preview functionality
  - [ ] Search and filter options

- [ ] **UC19: Delete Inappropriate Files**
  - [ ] DELETE /files/:id endpoint
  - [ ] Content moderation workflow
  - [ ] User notification system

## 👑 Admin Features

### User Management

- [ ] **UC20: Manage Users**
  - [ ] Admin authentication middleware
  - [ ] User management dashboard

- [ ] **UC21: Create Staff Account**
  - [ ] POST /users endpoint (admin only)
  - [ ] Role assignment logic
  - [ ] Staff onboarding workflow

- [ ] **UC22: Update User Roles**
  - [ ] PATCH /users/:id/role endpoint
  - [ ] Role transition validation
  - [ ] Permission updates

- [ ] **UC23: View All Users**
  - [ ] GET /users endpoint
  - [ ] User analytics
  - [ ] Activity monitoring

## 🔧 Technical Implementation

### Core Infrastructure

- [ ] **Database Setup**
  - [ ] PostgreSQL schema creation
  - [ ] Migration system
  - [ ] Seed data

- [ ] **Authentication System**
  - [ ] JWT implementation
  - [ ] Role-based middleware
  - [ ] Token refresh mechanism

- [ ] **API Structure**
  - [ ] Hono.js setup
  - [ ] Route organization
  - [ ] Error handling middleware
  - [ ] Validation middleware

### Data Models

- [ ] **User Entity**
  - [ ] User model with roles
  - [ ] Password hashing utilities
  - [ ] User repository

- [ ] **Trip Entity**
  - [ ] Trip model with scheduling
  - [ ] Seat management logic
  - [ ] Trip repository

- [ ] **Booking Entity**
  - [ ] Booking model with status
  - [ ] Seat conflict prevention
  - [ ] Booking repository

- [ ] **File Entity**
  - [ ] File metadata model
  - [ ] Storage abstraction
  - [ ] File repository

### Testing & Documentation

- [ ] **Unit Tests**
  - [ ] Entity tests
  - [ ] Repository tests
  - [ ] Service tests

- [ ] **Integration Tests**
  - [ ] API endpoint tests
  - [ ] Authentication flow tests
  - [ ] Database integration tests

- [ ] **API Documentation**
  - [ ] OpenAPI/Swagger setup
  - [ ] Endpoint documentation
  - [ ] Example requests/responses

## 📋 Dependencies & Requirements

### Use Case Dependencies

- UC4 requires UC3 (Browse before select)
- UC5 requires UC4 and UC2 (Select and login before booking)
- UC6 requires UC2 (Login before upload)
- UC7 requires UC2 (Login before viewing bookings)
- UC8 requires UC7 (View bookings before cancel)

### Extensions

- UC8 extends UC7 (Cancel is extension of view)
- UC6 extends UC5 (Upload is optional extension of booking)

## 🚀 Implementation Priority

### Phase 1: Core Authentication & Users

1. User registration and login
2. JWT authentication system
3. Role-based access control

### Phase 2: Trip Management

1. Trip CRUD operations
2. Trip browsing and filtering
3. Seat management system

### Phase 3: Booking System

1. Booking creation and management
2. Seat availability checking
3. Booking status workflow

### Phase 4: File Management

1. File upload system
2. File storage and retrieval
3. File moderation tools

### Phase 5: Advanced Features

1. Admin user management
2. Staff tools and dashboards
3. Reporting and analytics
