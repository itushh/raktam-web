# Environment Configuration

This project uses a centralized environment configuration system to handle different API endpoints based on the development/production mode.

## Configuration Files

### `src/config/env.js`
This is the main configuration file that handles environment detection and API URL management.

## How It Works

The system automatically detects the environment mode:
- **Development Mode**: Uses `http://localhost:3000` as the API base URL
- **Production Mode**: Uses `https://rakram-api.onrender.com` as the API base URL

## Usage

### Import the configuration
```javascript
import { getApiEndpoint, config } from '../config/env.js';
```

### Making API calls
Instead of hardcoding URLs, use the `getApiEndpoint` function:

```javascript
// ❌ Don't do this
const response = await fetch('http://localhost:3000/api/auth/login', {
  // ... options
});

// ✅ Do this instead
const response = await fetch(getApiEndpoint('/api/auth/login'), {
  // ... options
});
```

### Accessing configuration values
```javascript
import { config, isDevelopment, isProduction, apiUrl } from '../config/env.js';

console.log(config.mode); // 'development' or 'production'
console.log(config.apiUrl); // The current API base URL
console.log(isDevelopment); // true/false
console.log(isProduction); // true/false
console.log(apiUrl); // The current API base URL
```

## Available Scripts

- `npm run dev` - Runs in development mode (uses localhost:3000)
- `npm run build` - Builds for production (uses rakram-api.onrender.com)
- `npm run build:dev` - Builds for development (uses localhost:3000)

## Environment Detection

The system uses Vite's built-in environment detection:
- `import.meta.env.DEV` - true in development
- `import.meta.env.PROD` - true in production

This means the environment is automatically detected based on how you run the application, no manual configuration needed! 