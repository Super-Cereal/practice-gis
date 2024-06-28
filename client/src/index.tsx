import React from 'react';
import ReactDOM from 'react-dom/client';

import { ErrorBoundary } from './shared/lib/error-boundary';
import App from './App';

import './a11y.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    // <React.StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    // </React.StrictMode>,
);
