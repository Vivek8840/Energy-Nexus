# EnergyNexus - P2P Solar Energy Trading Platform

A comprehensive platform for peer-to-peer solar energy trading, allowing prosumers to sell excess solar energy directly to consumers through blockchain-verified transactions.

## 🏗️ Project Structure

```
energy-nexus/
├── backend/          # Node.js/TypeScript backend
│   ├── src/
│   │   ├── config/   # Database, Redis, Blockchain configs
│   │   ├── models/   # Database models
│   │   ├── controllers/ # Route handlers
│   │   ├── routes/   # API routes
│   │   ├── services/ # Business logic
│   │   ├── middleware/ # Auth, validation, etc.
│   │   └── utils/    # Helper functions
│   └── tests/        # Backend tests
└── frontend/         # React TypeScript frontend
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── pages/     # Page components
    │   ├── contexts/  # React contexts
    │   ├── hooks/     # Custom hooks
    │   ├── services/  # API services
    │   ├── utils/     # Helper functions
    │   └── types/     # TypeScript definitions
    └── tests/         # Frontend tests
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (for backend)
- Redis (for caching)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/energy-nexus.git
   cd energy-nexus/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd ../backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/energynexus
   REDIS_URL=redis://localhost:6379
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRY=24h
   
   # SMS/OTP Service
   SMS_API_KEY=your-sms-service-api-key
   
   # Payment Gateway
   PAYMENT_GATEWAY_KEY=your-payment-gateway-key
   
   # Blockchain
   BLOCKCHAIN_NODE_URL=your-blockchain-node-url
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The backend API will be available at `http://localhost:5000`

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **TypeScript** - Type safety
- **Express** - Web framework
- **MongoDB** - Primary database
- **Redis** - Caching & sessions
- **JWT** - Authentication
- **Zod** - Validation
- **Bull** - Job queues

## 📱 Features

### Core Functionality
- **User Authentication** - Secure login/signup with OTP verification
- **Multi-language Support** - English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati
- **Solar System Linking** - Connect solar meters via Consumer ID
- **Real-time Energy Trading** - P2P marketplace for energy transactions
- **Blockchain Verification** - Transparent transaction records
- **Dynamic Dashboard** - Prosumer vs Consumer views
- **Wallet Management** - Secure payments and withdrawals
- **Analytics & Reports** - Energy flow and earnings insights

### Landing Page
- **Interactive Calculator** - ROI calculator for solar installations
- **Potential Earnings Calculator** - For existing solar users
- **Social Proof** - Live trading statistics
- **How It Works** - Simple 3-step process explanation

### Settings & Profile
- **Profile Management** - Edit personal information
- **System Management** - Solar system details
- **Notification Preferences** - Granular control over alerts
- **Security Settings** - 2FA, biometric login, session management
- **Language Selection** - Multi-language support
- **Help & Support** - FAQs, tutorials, contact support

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **OTP Verification** - Phone number verification
- **Biometric Login** - Fingerprint/Face ID support
- **2FA Support** - Two-factor authentication
- **Session Management** - Configurable timeouts
- **Input Validation** - Comprehensive validation using Zod
- **Rate Limiting** - API rate limiting
- **CORS Protection** - Cross-origin request security

## 📊 Database Schema

### User Model
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  pincode: string;
  consumerId?: string;
  isProsumer: boolean;
  profilePicture?: string;
  settings: UserSettings;
  createdAt: Date;
  updatedAt: Date;
}
```

### Transaction Model
```typescript
interface Transaction {
  id: string;
  type: 'sell' | 'buy';
  amount: number; // kWh
  pricePerUnit: number; // ₹/kWh
  totalValue: number; // ₹
  buyerId: string;
  sellerId: string;
  status: 'pending' | 'completed' | 'failed';
  blockchainHash: string;
  timestamp: Date;
}
```

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm run test          # Run unit tests
npm run test:coverage # Run with coverage
npm run e2e           # Run e2e tests
```

### Backend Tests
```bash
cd backend
npm run test          # Run unit tests
npm run test:integration # Integration tests
npm run test:coverage # Run with coverage
```

## 📦 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
```

### Backend (Railway/Heroku)
```bash
npm run build
npm start
```

### Docker
```bash
# Build and run with Docker Compose
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.prod.yml up -d
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/forgot-password` - Password reset
- `POST /api/auth/logout` - User logout

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/settings` - Get user settings
- `PUT /api/users/settings` - Update user settings
- `POST /api/users/link-system` - Link solar system

### Energy Trading
- `GET /api/energy/current-data` - Real-time energy data
- `POST /api/energy/sell-surplus` - Sell excess energy
- `GET /api/energy/market-price` - Current market price
- `GET /api/energy/transactions` - Transaction history

### Marketplace
- `GET /api/market/orders` - Active orders
- `POST /api/market/buy-energy` - Purchase energy
- `GET /api/market/statistics` - Market statistics

### Wallet & Payments
- `GET /api/wallet/balance` - Wallet balance
- `POST /api/wallet/withdraw` - Withdraw funds
- `GET /api/wallet/transactions` - Wallet transactions
- `POST /api/wallet/add-bank-account` - Add bank account

### Analytics
- `GET /api/analytics/energy-flow` - Energy flow data
- `GET /api/analytics/earnings` - Earnings analytics
- `GET /api/analytics/reports` - Generate reports
- `POST /api/analytics/export` - Export data

## 🌐 Environment Variables

### Frontend (.env.local)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_WEBSOCKET_URL=ws://localhost:5000
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development
```

### Backend (.env)
```env
# Server
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database
MONGODB_URI=mongodb://localhost:27017/energynexus
MONGODB_TEST_URI=mongodb://localhost:27017/energynexus_test
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRY=24h
JWT_REFRESH_EXPIRY=7d

# External Services
SMS_SERVICE_URL=https://api.textlocal.in
SMS_API_KEY=your-sms-api-key
EMAIL_SERVICE_API_KEY=your-email-service-key

# Payment Gateway
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Blockchain
BLOCKCHAIN_NETWORK=testnet
BLOCKCHAIN_NODE_URL=your-blockchain-node-url
PRIVATE_KEY=your-blockchain-private-key

# File Storage
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log
```

## 🎨 UI/UX Guidelines

### Color Palette
- **Primary Green**: `#22c55e` - Success, energy, nature
- **Secondary Yellow**: `#eab308` - Solar, energy, optimism  
- **Accent Blue**: `#3b82f6` - Trust, technology, reliability
- **Dark Gray**: `#1e293b` - Text, professional
- **Light Gray**: `#f8fafc` - Backgrounds, subtle elements

### Typography
- **Primary**: Inter (system fonts fallback)
- **Monospace**: JetBrains Mono (for data display)

### Component Standards
- Consistent spacing using Tailwind's spacing scale
- Rounded corners: `rounded-lg` (8px) for cards, `rounded` (4px) for buttons
- Shadows: `shadow-sm` for cards, `shadow-soft` for modals
- Animations: Subtle transitions (0.3s) for interactive elements

## 📋 Development Guidelines

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Extended from recommended configs
- **Prettier**: Consistent code formatting
- **Imports**: Absolute imports using path aliases (@/)

### Git Workflow
```bash
# Feature development
git checkout -b feature/settings-page
git add .
git commit -m "feat: add comprehensive settings page"
git push origin feature/settings-page

# Create pull request for review
```

### Commit Convention
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/modifications
- `chore:` Build process or auxiliary tool changes

## 🚦 Quality Assurance

### Code Quality Tools
- **TypeScript** - Type checking
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Jest** - Unit testing
- **Cypress** - E2E testing

### Performance Monitoring
- **Web Vitals** - Core web vitals tracking
- **Bundle Analyzer** - Bundle size optimization
- **Lighthouse** - Performance auditing

## 📱 Mobile Responsiveness

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

### Mobile-First Approach
- All components designed mobile-first
- Progressive enhancement for larger screens
- Touch-friendly interactions
- Optimized performance for mobile devices

## 🔧 Maintenance

### Regular Tasks
- Dependency updates (monthly)
- Security patches (as needed)
- Performance optimization (quarterly)
- Database maintenance (weekly)
- Log rotation and cleanup (daily)

### Monitoring
- Application performance metrics
- Error tracking and reporting
- User analytics and behavior
- System resource utilization

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Pull Request Guidelines
- Clear description of changes
- Include relevant test cases
- Update documentation if needed
- Follow coding standards
- Add screenshots for UI changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Team

### Core Structure & Settings Team
- **Lead Developer**: Responsible for core structure setup
- **Settings Implementation**: Complete settings page development
- **GitHub Management**: Repository management and PR reviews

### Other Teams
- **Authentication Team**: Login, signup, OTP verification
- **Dashboard Team**: Energy monitoring and trading interface
- **Calculator Team**: ROI and earnings calculators
- **Marketplace Team**: P2P trading functionality

## 📞 Support

For support and questions:
- **Documentation**: Check the `/docs` folder
- **Issues**: Create GitHub issues
- **Email**: support@energynexus.com
- **Discord**: Join our development community

---

**EnergyNexus** - Powering the future of decentralized energy trading 🌱⚡