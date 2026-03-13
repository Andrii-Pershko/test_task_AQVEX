import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './store';
import './index.css';

// basename для GitHub Pages: інакше pathname буде /test_task_AQVEX/ і роут "/" не збігається
const base = import.meta.env.BASE_URL;
const basename = base === './' || base === '/' ? undefined : base.replace(/\/$/, '');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

