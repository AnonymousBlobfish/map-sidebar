import ReactDOM from 'react-dom';
import React from 'react';
import { App } from './app.jsx';
import '../dist/styles.css';
import '../dist/fontawesome-all.min.js';

var restaurantId = location.pathname.split('/')[2];
console.log('restaurant id is', restaurantId)
restaurantId = parseInt(restaurantId);

ReactDOM.render(<App restaurantId={restaurantId} restaurant={null}/>, document.getElementById('sidebar-app'));
