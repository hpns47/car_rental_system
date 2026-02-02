# Car Rental System - API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require Bearer token in Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Response Format

All responses are JSON:

```json
{
  "data": {},
  "message": "Success message",
  "error": "Error message if any"
}
```

---

## Auth Endpoints

### Register User

**POST** `/auth/register`

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "licenseNumber": "DL12345",
  "licenseExpiry": "2026-01-01"
}
```

Response (201):

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "60d5ec49c1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  },
  "token": "eyJhbGc..."
}
```

### Login

**POST** `/auth/login`

Request:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response (200):

```json
{
  "message": "Login successful",
  "user": {
    "id": "60d5ec49c1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  },
  "token": "eyJhbGc..."
}
```

### Get Profile

**GET** `/auth/profile`

Headers: `Authorization: Bearer <token>`

Response (200):

```json
{
  "_id": "60d5ec49c1234567890abcde",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "role": "customer",
  "licenseNumber": "DL12345",
  "address": {},
  "totalRentals": 5,
  "ratings": []
}
```

### Update Profile

**PUT** `/auth/profile`

Headers: `Authorization: Bearer <token>`

Request:

```json
{
  "name": "John Updated",
  "phone": "9876543210",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  }
}
```

Response (200):

```json
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

### Get All Users (Admin)

**GET** `/auth/users`

Headers: `Authorization: Bearer <admin_token>`

Query Parameters:

- `role`: admin|customer
- `isActive`: true|false

Response (200):

```json
[
  {
    "_id": "60d5ec49c1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "totalRentals": 5
  }
]
```

### Get User by ID

**GET** `/auth/users/:id`

Headers: `Authorization: Bearer <token>`

Response (200): User object

### Delete User (Admin)

**DELETE** `/auth/users/:id`

Headers: `Authorization: Bearer <admin_token>`

Response (200):

```json
{
  "message": "User deleted successfully"
}
```

---

## Car Endpoints

### Create Car (Admin)

**POST** `/cars`

Headers: `Authorization: Bearer <admin_token>`

Request:

```json
{
  "make": "Toyota",
  "model": "Camry",
  "year": 2023,
  "licensePlate": "ABC123",
  "vin": "VIN123456",
  "category": "comfort",
  "dailyRate": 50,
  "seats": 5,
  "transmission": "automatic",
  "fuelType": "petrol",
  "features": ["AC", "GPS", "Bluetooth"],
  "location": {
    "branch": "Downtown",
    "coordinates": { "latitude": 40.7128, "longitude": -74.006 }
  }
}
```

Response (201): Created car object

### Get All Cars

**GET** `/cars`

Query Parameters:

- `status`: available|rented|maintenance
- `category`: economy|comfort|luxury|suv|van
- `minPrice`: number
- `maxPrice`: number
- `page`: number (default: 1)
- `limit`: number (default: 10)

Response (200):

```json
{
  "cars": [
    {
      "_id": "60d5ec49c1234567890abcde",
      "make": "Toyota",
      "model": "Camry",
      "year": 2023,
      "dailyRate": 50,
      "status": "available",
      "seats": 5,
      "category": "comfort"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "pages": 3
  }
}
```

### Get Available Cars

**GET** `/cars/available`

Query Parameters:

- `startDate`: ISO date string
- `endDate`: ISO date string
- `category`: filter by category
- `branch`: filter by location

Response (200): Array of available cars

### Get Car by ID

**GET** `/cars/:id`

Response (200): Car object

### Update Car (Admin)

**PUT** `/cars/:id`

Headers: `Authorization: Bearer <admin_token>`

Request: Partial car object (allowed fields)

Response (200):

```json
{
  "message": "Car updated successfully",
  "car": { ... }
}
```

### Delete Car (Admin)

**DELETE** `/cars/:id`

Headers: `Authorization: Bearer <admin_token>`

Response (200):

```json
{
  "message": "Car deleted successfully"
}
```

---

## Rental Endpoints

### Create Rental

**POST** `/rentals`

Headers: `Authorization: Bearer <customer_token>`

Request:

```json
{
  "carId": "60d5ec49c1234567890abcde",
  "startDate": "2024-02-01",
  "endDate": "2024-02-05",
  "pickupLocation": {
    "branch": "Downtown"
  },
  "dropoffLocation": {
    "branch": "Downtown"
  },
  "insuranceSelected": "standard"
}
```

Response (201):

```json
{
  "message": "Rental created successfully",
  "rental": {
    "_id": "...",
    "customerId": "...",
    "carId": "...",
    "startDate": "2024-02-01",
    "endDate": "2024-02-05",
    "totalDays": 4,
    "basePrice": 200,
    "insuranceCost": 20,
    "totalPrice": 220,
    "status": "booked"
  }
}
```

### Get All Rentals (Admin)

**GET** `/rentals`

Headers: `Authorization: Bearer <admin_token>`

Query Parameters:

- `status`: booked|ongoing|completed|cancelled
- `customerId`: filter by customer
- `page`: number
- `limit`: number

Response (200): Paginated rentals with populated customer and car info

### Get Customer Rentals

**GET** `/rentals/my-rentals`

Headers: `Authorization: Bearer <customer_token>`

Response (200): Array of customer's rentals

### Get Rental Stats (Admin)

**GET** `/rentals/stats`

Headers: `Authorization: Bearer <admin_token>`

Response (200):

```json
{
  "totalRevenue": [
    {
      "total": 50000,
      "count": 250
    }
  ],
  "rentalsByStatus": [{ "_id": "completed", "count": 200 }],
  "rentalsByCategory": [{ "_id": "comfort", "count": 100, "revenue": 15000 }],
  "monthlyRevenue": [{ "_id": "2024-01", "revenue": 10000, "rentals": 50 }]
}
```

### Get Rental by ID

**GET** `/rentals/:id`

Headers: `Authorization: Bearer <token>`

Response (200): Rental object with populated references

### Update Rental Status (Admin)

**PATCH** `/rentals/:id/status`

Headers: `Authorization: Bearer <admin_token>`

Request:

```json
{
  "status": "completed",
  "finalMileage": 5250,
  "damageCharge": 100,
  "notes": "Small scratch on door"
}
```

Response (200):

```json
{
  "message": "Rental status updated successfully",
  "rental": { ... }
}
```

### Cancel Rental

**PATCH** `/rentals/:id/cancel`

Headers: `Authorization: Bearer <customer_token>`

Request:

```json
{
  "cancelReason": "Emergency came up"
}
```

Response (200):

```json
{
  "message": "Rental cancelled successfully",
  "rental": { ... }
}
```

### Rate Rental

**POST** `/rentals/:id/rate`

Headers: `Authorization: Bearer <customer_token>`

Request:

```json
{
  "score": 5,
  "comment": "Great service and clean car!"
}
```

Response (200):

```json
{
  "message": "Rating added successfully",
  "rental": { ... }
}
```

---

## Invoice Endpoints

### Create Invoice (Admin)

**POST** `/invoices`

Headers: `Authorization: Bearer <admin_token>`

Request:

```json
{
  "rentalId": "60d5ec49c1234567890abcde"
}
```

Response (201):

```json
{
  "message": "Invoice created successfully",
  "invoice": {
    "_id": "...",
    "invoiceNumber": "INV-1704063600000-ABC123XYZ",
    "customerId": "...",
    "rentalId": "...",
    "carDetails": {
      "make": "Toyota",
      "model": "Camry",
      "licensePlate": "ABC123"
    },
    "itemizedCharges": [
      {
        "description": "4 days rental",
        "amount": 200,
        "quantity": 4
      },
      {
        "description": "standard insurance",
        "amount": 20,
        "quantity": 1
      }
    ],
    "subtotal": 220,
    "tax": 22,
    "totalAmount": 242,
    "amountPaid": 0,
    "remainingBalance": 242,
    "status": "issued"
  }
}
```

### Get All Invoices (Admin)

**GET** `/invoices`

Headers: `Authorization: Bearer <admin_token>`

Query Parameters:

- `status`: draft|issued|paid|overdue|cancelled
- `customerId`: filter by customer
- `page`: number
- `limit`: number

Response (200): Paginated invoices

### Get Customer Invoices

**GET** `/invoices/my-invoices`

Headers: `Authorization: Bearer <customer_token>`

Response (200): Array of customer's invoices

### Get Invoice Report (Admin)

**GET** `/invoices/report`

Headers: `Authorization: Bearer <admin_token>`

Query Parameters:

- `startDate`: ISO date string
- `endDate`: ISO date string

Response (200):

```json
{
  "totalRevenue": [{ "total": 50000, "count": 250 }],
  "invoicesByStatus": [{ "_id": "paid", "count": 200, "amount": 48000 }],
  "dailyRevenue": [{ "_id": "2024-01-15", "revenue": 1500, "invoices": 10 }]
}
```

### Get Invoice by ID

**GET** `/invoices/:id`

Headers: `Authorization: Bearer <token>`

Response (200): Invoice with populated references

### Mark Invoice as Paid

**PATCH** `/invoices/:id/pay`

Headers: `Authorization: Bearer <customer_token>`

Request:

```json
{
  "amountPaid": 242,
  "paymentMethod": "credit_card"
}
```

Response (200):

```json
{
  "message": "Payment processed successfully",
  "invoice": { ... }
}
```

---

## Maintenance Endpoints

### Schedule Maintenance (Admin)

**POST** `/maintenance`

Headers: `Authorization: Bearer <admin_token>`

Request:

```json
{
  "carId": "60d5ec49c1234567890abcde",
  "type": "routine",
  "description": "Oil change and filter replacement",
  "scheduledDate": "2024-02-10",
  "priority": "medium"
}
```

Response (201): Created maintenance record

### Get All Maintenance (Admin)

**GET** `/maintenance`

Headers: `Authorization: Bearer <admin_token>`

Query Parameters:

- `carId`: filter by car
- `status`: scheduled|in_progress|completed|cancelled
- `page`: number
- `limit`: number

Response (200): Paginated maintenance records

### Get Maintenance Schedule (Admin)

**GET** `/maintenance/schedule`

Headers: `Authorization: Bearer <admin_token>`

Query Parameters:

- `startDate`: ISO date string
- `endDate`: ISO date string

Response (200): Scheduled maintenance for date range

### Get Maintenance Costs (Admin)

**GET** `/maintenance/costs`

Headers: `Authorization: Bearer <admin_token>`

Query Parameters:

- `startDate`: ISO date string
- `endDate`: ISO date string
- `carId`: optional filter

Response (200):

```json
{
  "totalCost": [{ "total": 5000, "count": 25 }],
  "costByType": [{ "_id": "routine", "cost": 2000, "count": 10 }],
  "costByCar": [{ "_id": "ABC123", "cost": 1000, "count": 5 }]
}
```

### Get Maintenance by ID (Admin)

**GET** `/maintenance/:id`

Headers: `Authorization: Bearer <admin_token>`

Response (200): Maintenance record

### Update Maintenance Status (Admin)

**PATCH** `/maintenance/:id`

Headers: `Authorization: Bearer <admin_token>`

Request:

```json
{
  "status": "completed",
  "startDate": "2024-02-10",
  "completedDate": "2024-02-11",
  "actualCost": 150,
  "partsReplaced": ["Oil filter", "Air filter"],
  "notes": "All work completed successfully"
}
```

Response (200):

```json
{
  "message": "Maintenance status updated successfully",
  "maintenance": { ... }
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "error": "Validation error",
  "details": ["Field is required"]
}
```

### 401 Unauthorized

```json
{
  "error": "Invalid token"
}
```

### 403 Forbidden

```json
{
  "error": "Forbidden"
}
```

### 404 Not Found

```json
{
  "error": "Car not found"
}
```

### 409 Conflict

```json
{
  "error": "Duplicate field value"
}
```

### 500 Server Error

```json
{
  "error": "Internal server error"
}
```
