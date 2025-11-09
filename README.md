# Comprehensive Banking Application

A full-stack banking application built with Spring Boot, React, and React Native, featuring enterprise-grade security, scalability, and reliability.

## Architecture

- **Backend**: Spring Boot 3.x with Java 17
- **Web Frontend**: React 18+ with TypeScript
- **Mobile**: React Native with TypeScript
- **Database**: PostgreSQL
- **Cache**: Redis
- **Message Queue**: Apache Kafka
- **API Documentation**: Swagger/OpenAPI 3.0

## Features

### Core Banking Features

- **User Management & Authentication**
  - JWT-based authentication with refresh tokens
  - Multi-factor authentication (2FA)
  - KYC verification
  - Role-based access control

- **Account Management**
  - Multiple account types (Savings, Checking, Fixed Deposit, etc.)
  - Real-time balance updates
  - Account statements
  - Interest calculation

- **Transaction Processing**
  - Fund transfers (NEFT, RTGS, IMPS, UPI)
  - Transaction history and tracking
  - Scheduled and recurring transactions
  - Transaction limits and approvals

- **Card Management**
  - Debit/Credit card issuance
  - Virtual card generation
  - Card controls and limits
  - PIN management

- **Loan Management**
  - Multiple loan types (Personal, Home, Auto, Education)
  - EMI calculation and scheduling
  - Loan application and approval workflow
  - Prepayment and foreclosure

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- Node.js 18+
- Docker and Docker Compose
- PostgreSQL 15+ (or use Docker)

### Running with Docker Compose

The easiest way to run the entire application stack:

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Redis cache on port 6379
- Kafka message broker on port 9092
- Spring Boot backend on port 8080

### Running Backend Locally

1. **Configure Database**

Create a PostgreSQL database:
```sql
CREATE DATABASE banking_db;
```

2. **Update Configuration**

Edit `src/main/resources/application.yml` with your database credentials.

3. **Build and Run**

```bash
mvn clean install
mvn spring-boot:run
```

The backend will be available at `http://localhost:8080/api`

### API Documentation

Once the application is running, access Swagger UI at:
```
http://localhost:8080/api/swagger-ui.html
```

API documentation is available at:
```
http://localhost:8080/api/api-docs
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Accounts
- `POST /api/accounts` - Create new account
- `GET /api/accounts` - Get all user accounts
- `GET /api/accounts/{accountNumber}` - Get account details

### Transactions
- `POST /api/transactions/transfer` - Transfer funds
- `GET /api/transactions` - Get transaction history

## Security Features

- **Authentication**: JWT with RS256 signing
- **Authorization**: Role-based access control (RBAC)
- **Encryption**: AES-256 for sensitive data
- **Transport Security**: TLS 1.3
- **Rate Limiting**: Protection against brute force
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Input validation and sanitization

## Database Schema

Key entities:
- Users
- Accounts
- Transactions
- Cards
- Loans
- Beneficiaries

Database migrations are managed using Flyway.

## Testing

Run tests:
```bash
mvn test
```

Run with coverage:
```bash
mvn clean test jacoco:report
```

## CI/CD

The project includes GitHub Actions workflows for:
- Automated testing
- Building Docker images
- Code quality checks
- Security scanning

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_USERNAME` | Database username | postgres |
| `DB_PASSWORD` | Database password | postgres |
| `JWT_SECRET` | JWT signing secret | (change in production) |
| `REDIS_HOST` | Redis host | localhost |
| `KAFKA_BOOTSTRAP_SERVERS` | Kafka servers | localhost:9092 |

## Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Write tests
4. Submit a pull request

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.

## Support

For support, email support@banking.com or open an issue on GitHub.
