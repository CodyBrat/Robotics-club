import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SimplifiedApp from './SimplifiedApp';
import reportWebVitals from './reportWebVitals';

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // You could report to an error logging service here
});

// Safely render
const renderApp = () => {
  try {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    
    // We'll try the main app first, and if it fails, we'll catch it below
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // Add a backup mechanism - if the app doesn't show anything after 8 seconds,
    // try rendering the simplified version without Spline
    setTimeout(() => {
      const appElement = document.querySelector('[data-testid="app-loaded"]');
      if (!appElement) {
        console.log("Main app may have failed silently - trying simplified version");
        try {
          root.render(
            <React.StrictMode>
              <SimplifiedApp />
            </React.StrictMode>
          );
        } catch (fallbackError) {
          console.error("Even simplified app failed:", fallbackError);
        }
      }
    }, 8000);
    
  } catch (error) {
    console.error('Failed to render app:', error);
    
    // Try the simplified app
    try {
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
        <React.StrictMode>
          <SimplifiedApp />
        </React.StrictMode>
      );
    } catch (fallbackError) {
      console.error("Even simplified app failed:", fallbackError);
      // Fallback to basic rendering as a last resort
      const rootElement = document.getElementById('root');
      if (rootElement) {
        rootElement.innerHTML = `
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; color: white; background: black; text-align: center; padding: 20px;">
            <h1 style="font-size: 5rem; margin-bottom: 1rem;">IRIS</h1>
            <p>Interactive Robotics Intelligence Systems</p>
          </div>
        `;
      }
    }
  }
};

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
