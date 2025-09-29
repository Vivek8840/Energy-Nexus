# EnergyNexus Development Setup Guide

This guide will help you set up the EnergyNexus development environment on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Visual Studio Code** (recommended) - [Download](https://code.visualstudio.com/)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/energy-nexus.git
cd energy-nexus
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 3. Backend Setup (Future)

```bash
# Navigate to backend directory
cd ../backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

The backend will be available at `http://localhost:5000`

## 📁 Project Structure Overview

```
energy-nexus/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts (Auth, User, Language, etc.)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Helper functions
│   │   └── styles/          # Global styles and CSS
│   ├── public/              # Static assets
│   └── package.json         # Dependencies and scripts
└── backend/                 # Node.js TypeScript backend (To be implemented)
    ├── src/
    │   ├── config/          # Database and service configurations
    │   ├── models/          # Database models
    │   ├── controllers/     # Route handlers
    │   ├── routes/          # API routes
    │   ├── services/        # Business logic
    │   ├── middleware/      # Auth, validation, etc.
    │   └── utils/           # Helper functions
    └── package.json         # Backend dependencies
```

## 🛠️ Development Tools & Extensions

### Recommended VS Code Extensions

Install these extensions for the best development experience:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "yzhang.markdown-all-in-one"
  ]
}
```

### VS Code Settings

Create `.vscode/settings.json` in your project root:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html"
  },
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## 🔧 Environment Configuration

### Frontend Environment Variables (.env.local)

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_WEBSOCKET_URL=ws://localhost:5000

# App Configuration
VITE_APP_VERSION=1.0.0
VITE_APP_NAME=EnergyNexus
VITE_ENVIRONMENT=development

# Feature Flags
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_BIOMETRIC=true
VITE_ENABLE_NOTIFICATIONS=true

# Third Party Services (Replace with actual keys)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
VITE_SENTRY_DSN=your_sentry_dsn
```

### Backend Environment Variables (.env) - Future Implementation

```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database
MONGODB_URI=mongodb://localhost:27017/energynexus
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRY=24h
JWT_REFRESH_EXPIRY=7d

# External Services
SMS_SERVICE_API_KEY=your_sms_service_key
EMAIL_SERVICE_API_KEY=your_email_service_key

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# File Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📝 Available Scripts

### Frontend Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # TypeScript type checking

# Testing (Future)
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run e2e          # Run end-to-end tests
```

### Backend Scripts (Future)

```bash
# Development
npm run dev          # Start development server with nodemon
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run migrate      # Run database migrations
npm run seed         # Seed database with sample data
```

## 🎨 Code Style Guidelines

### TypeScript Configuration

The project uses strict TypeScript configuration:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### ESLint Rules

Key ESLint rules enforced:

- Use TypeScript strict mode
- Prefer const over let
- No unused variables
- Consistent import ordering
- React hooks dependencies

### Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

## 🔗 Path Aliases

The project uses path aliases for clean imports:

```typescript
// Instead of: import Component from '../../../components/ui/Button'
import Component from '@/components/ui/Button'

// Available aliases:
// @/*           -> ./src/*
// @components/* -> ./src/components/*
// @pages/*      -> ./src/pages/*
// @types/*      -> ./src/types/*
// @utils/*      -> ./src/utils/*
// @hooks/*      -> ./src/hooks/*
// @stores/*     -> ./src/stores/*
// @styles/*     -> ./src/styles/*
```

## 🧪 Testing Strategy

### Unit Tests (Future Implementation)

```bash
# Test structure
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx    # Unit tests
├── hooks/
│   ├── useAuth.ts
│   └── useAuth.test.ts        # Hook tests
└── utils/
    ├── helpers.ts
    └── helpers.test.ts        # Utility tests
```

### Integration Tests (Future Implementation)

```bash
tests/
├── integration/
│   ├── auth.test.ts
│   ├── settings.test.ts
│   └── dashboard.test.ts
└── e2e/
    ├── login-flow.spec.ts
    ├── energy-trading.spec.ts
    └── settings-management.spec.ts
```

## 📚 Key Technologies & Libraries

### Frontend Stack

- **React 18** - UI library with concurrent features
- **TypeScript** - Type safety and better DX
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Lucide React** - Icon library

### Development Dependencies

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Autoprefixer** - CSS vendor prefixes
- **PostCSS** - CSS processing

## 🚦 Git Workflow

### Branch Naming Convention

```bash
# Feature branches
feature/settings-page
feature/user-authentication
feature/energy-dashboard

# Bug fixes
bugfix/settings-validation
bugfix/login-redirect

# Hotfixes
hotfix/critical-security-patch

# Release branches
release/v1.0.0
```

### Commit Message Format

Follow conventional commits:

```bash
feat: add comprehensive settings page
fix: resolve login redirect issue
docs: update setup instructions
style: format code with prettier
refactor: extract settings context
test: add unit tests for auth service
chore: update dependencies
```

### Pull Request Process

1. Create feature branch from `main`
2. Make changes and commit
3. Push branch and create PR
4. Request review from team members
5. Address review feedback
6. Merge after approval

## 🔍 Debugging

### Browser DevTools

1. **React Developer Tools** - Debug React components
2. **Redux DevTools** - Debug state management (if using Redux)
3. **Network Tab** - Monitor API calls
4. **Console** - Check for JavaScript errors
5. **Performance Tab** - Profile app performance

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/frontend/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

## 📱 Mobile Development

### Testing on Mobile Devices

```bash
# Find your local IP
ipconfig getifaddr en0  # macOS
ifconfig                # Linux

# Access via mobile browser
http://YOUR_LOCAL_IP:3000
```

### Mobile-First Approach

- Design mobile layouts first
- Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Test on various screen sizes
- Optimize touch interactions

## 🚀 Deployment

### Build for Production

```bash
# Frontend build
npm run build

# Check build size
npm run preview
```

### Environment-specific Builds

```bash
# Development build
NODE_ENV=development npm run build

# Staging build
NODE_ENV=staging npm run build

# Production build
NODE_ENV=production npm run build
```

## 📊 Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

### Performance Best Practices

1. **Lazy Loading** - Code split pages and components
2. **Image Optimization** - Use modern formats (WebP)
3. **Tree Shaking** - Remove unused code
4. **Caching** - Implement proper caching strategies
5. **Minification** - Compress JavaScript and CSS

## 🆘 Troubleshooting

### Common Issues

#### Node Version Issues
```bash
# Check Node version
node --version

# Use Node Version Manager
nvm use 18
nvm install 18
```

#### Port Already in Use
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Use different port
npm run dev -- --port 3001
```

#### Cache Issues
```bash
# Clear npm cache
npm cache clean --force

# Clear Vite cache
rm -rf node_modules/.vite

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors
```bash
# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"

# Check TypeScript configuration
npx tsc --noEmit
```

## 👥 Team Collaboration

### Code Reviews

- Review checklist in PR template
- Focus on functionality, performance, and security
- Check mobile responsiveness
- Verify accessibility standards

### Communication

- Use GitHub Issues for bug reports
- Use GitHub Discussions for feature discussions
- Document decisions in ADRs (Architecture Decision Records)

## 📖 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Router Documentation](https://reactrouter.com/en/main)

---

**Happy Coding! 🚀**

For questions or issues, please check the [GitHub Issues](https://github.com/your-org/energy-nexus/issues) or contact the team leads.