import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; 
import App from './App';
import { ErrorBoundary } from 'react-error-boundary';

const root = ReactDOM.createRoot(document.getElementById('root'));

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

