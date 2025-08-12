# TypeScript Product Management API

A robust TypeScript-based REST API for managing products and categories, built with Express.js, PostgreSQL, Redis, and Docker support.

## 🚀 Features

- **RESTful API** for product management
- **PostgreSQL** database with Sequelize ORM
- **Redis** caching for improved performance
- **Docker** containerization with docker-compose
- **Swagger/OpenAPI** documentation
- **TypeScript** for type safety
- **Database migrations and seeders**
- **Input validation** with Zod schemas
- **Comprehensive logging** with Winston
- **ESLint** for code quality

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v16 or higher)
- Redis (v7 or higher)
- Docker and Docker Compose (optional, for containerized setup)

## 🛠️ Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd typescript
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=your_database
   DB_USER=your_username
   DB_PASSWORD=your_password
   REDIS_HOST=localhost
   REDIS_PORT=6379
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Run database migrations and seeders**
   ```bash
   npm run migrate
   ```

6. **Start the application**
   ```bash
   npm start
   ```

### Docker Development

1. **Create environment file for Docker**
   Create a `.env.docker` file:
   ```env
   PORT=3000
   DB_HOST=db
   DB_PORT=5432
   DB_NAME=docker
   DB_USER=admin
   DB_PASSWORD=12346
   REDIS_HOST=redis
   REDIS_PORT=6379
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

## 📚 API Documentation

Once the application is running, visit:
- **Swagger UI**: `http://localhost:3000/api-docs`

## 🗄️ Database Schema

### Categories Table
- `id` (UUID, Primary Key)
- `watch_type` (String)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Products Table
- `id` (UUID, Primary Key)
- `name` (String)
- `price` (Decimal)
- `category_id` (UUID, Foreign Key)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## 🛣️ API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/products/:id` | Get product by ID |
| POST | `/products` | Create new product |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

### Example Request Bodies

**Create Product:**
```json
{
  "name": "Premium Watch",
  "price": 299.99,
  "category_id": "uuid-string"
}
```

**Update Product:**
```json
{
  "name": "Updated Watch Name",
  "price": 349.99
}
```

## 🏗️ Project Structure

```
typescript/
├── src/
│   ├── common/           # Shared utilities
│   │   ├── errors.ts     # Error messages
│   │   ├── logger.ts     # Winston logger
│   │   ├── statusCodes.ts # HTTP status codes
│   │   └── swagger.ts    # Swagger configuration
│   ├── config/           # Configuration files
│   │   └── config.ts     # Database configuration
│   ├── controllers/      # Request handlers
│   │   └── productController.ts
│   ├── db/              # Database connection
│   │   └── db.ts
│   ├── dto/             # Data Transfer Objects
│   │   ├── dto.ts
│   │   └── productsSchemas.ts
│   ├── models/          # Sequelize models
│   │   ├── categories.ts
│   │   └── product.ts
│   ├── routes/          # API routes
│   │   └── productRoute.ts
│   ├── services/        # Business logic
│   │   ├── productService.ts
│   │   └── redisService.ts
│   ├── utils/           # Helper utilities
│   │   └── validatewithSchema.ts
│   └── main.ts          # Application entry point
├── migrations/          # Database migrations
├── seeders/            # Database seeders
├── docker-compose.yml  # Docker compose configuration
├── Dockerfile         # Docker image configuration
└── tsconfig.json      # TypeScript configuration
```

## 🧪 Available Scripts

- `npm start` - Build and start the application
- `npm run build` - Compile TypeScript to JavaScript
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run migrate` - Run database migrations and seeders
- `npm run migrate_undo` - Undo all migrations

## 🔧 Technologies Used

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Caching**: Redis with ioredis
- **Validation**: Zod
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston with Chalk
- **Linting**: ESLint with TypeScript support
- **Containerization**: Docker & Docker Compose

## 🚧 Development

### Adding New Features

1. Create models in `src/models/`
2. Add migrations in `migrations/`
3. Create schemas in `src/dto/`
4. Implement services in `src/services/`
5. Add controllers in `src/controllers/`
6. Define routes in `src/routes/`

### Database Operations

- **Create migration**: Use Sequelize CLI
- **Run migrations**: `npm run migrate`
- **Undo migrations**: `npm run migrate_undo`

## 🔍 Monitoring and Logging

The application includes comprehensive logging with Winston:
- Application logs are written to `app.log`
- Console output with colored formatting using Chalk
- Error tracking and debugging information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feat/new-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Troubleshooting

### Common Issues

1. **Database connection errors**: Ensure PostgreSQL is running and environment variables are correct
2. **Redis connection errors**: Verify Redis server is running
3. **Migration errors**: Check database permissions and connection settings
4. **Docker issues**: Ensure Docker daemon is running and ports are available

### Health Checks

The application performs health checks on:
- PostgreSQL database connection
- Redis server connectivity

## 📞 Support

For support and questions, please create an issue in the repository.
