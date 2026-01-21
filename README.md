# ConnectPay API

A Node.js backend API for user authentication, profile management, wallet integration, messaging, and call signaling.

## Features

- User Authentication (Signup/Login with JWT)
- User Profile Management
- Wallet Creation & Balance (OnePipe integration - mocked)
- Real-time Messaging (Socket.IO)
- Call Signaling (mocked)

## Tech Stack

- Node.js with TypeScript
- Express.js
- PostgreSQL with pg
- Socket.IO for real-time messaging
- JWT for authentication
- bcrypt for password hashing

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd connectpay-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   - Install PostgreSQL
   - Create a database named `connectpay_db`
   - Run the schema:
     ```bash
     psql -d connectpay_db -f database/schema.sql
     ```

4. **Set up the database schema**
   ```bash
   npm run setup-db
   ```

5. **Configure environment variables**
     ```
     DATABASE_URL=postgresql://your_username:your_password@localhost:5432/connectpay_db
     JWT_SECRET=your_super_secret_jwt_key_here
     PORT=5001
     ```

5. **Build and run**
   ```bash
   npm run build
   npm start
   ```
   Or for development:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/signup` - Register user
- `POST /api/login` - Login user

### Profile (requires JWT)
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Wallet (requires JWT)
- `POST /api/wallet/create` - Create wallet
- `GET /api/wallet/balance` - Get wallet balance

### Messaging (requires JWT)
- `GET /api/chats/:userId` - Get chat history with user
- WebSocket: `send_message` event for real-time messaging

### Calls (requires JWT)
- `POST /api/call/start` - Start call
- `POST /api/call/end` - End call

## Testing with Postman

1. Signup/Login to get JWT token
2. Use token in Authorization header: `Bearer <token>`
3. Test endpoints as described

## Assumptions

- OnePipe API is mocked since test keys not available
- Call signaling is stubbed
- Database connection is required for server to start