import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import styles from './styles/styles.scss';

// uncomment so that webpack can bundle styles
//console.log('123');
//render(<App />, document.getElementById('app'));
const div = document.getElementById('app');
const root = createRoot(div);
root.render(<App />);
