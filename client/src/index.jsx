import ReactDOM from 'react-dom';
import React from 'react';
import { App } from './app.jsx';
import '../dist/styles.css';
import '../dist/fontawesome-all.min.js';

ReactDOM.hydrate(<App />, document.getElementById('sidebar-app'));
