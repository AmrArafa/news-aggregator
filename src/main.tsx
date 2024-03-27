import React from 'react';
import ReactDOM from 'react-dom/client';
import NewsAggregator from './NewsAggregator.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NewsAggregator />
  </React.StrictMode>
);
