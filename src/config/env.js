const getApiUrl = () => {
  const isDevelopment = import.meta.env.DEV;
  
  if (isDevelopment) {
    return 'http://localhost:3000';
  } else {
    return 'https://raktam-api.onrender.com';
  }
};

export const config = {
  mode: import.meta.env.DEV ? 'development' : 'production',
  apiUrl: getApiUrl(),
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export const getApiEndpoint = (endpoint) => {
  return `${config.apiUrl}${endpoint}`;
};

export const { mode, apiUrl, isDevelopment, isProduction } = config; 