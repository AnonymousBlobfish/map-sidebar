var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var morgan = require('morgan');
var restaurantsRouter = require('./routers/restaurants.js');
var restaurantsApiRouter = require('./routers/restaurants_api.js');
var axios = require('axios');
var getRestaurantById = require('../db/controllers/getRestaurantById.js');

import React from 'react';
import ReactDOM from 'react-dom/server';
import { App } from '../client/src/app.jsx';

app.use(cors());
//app.use(morgan('tiny'));

app.options((req, res) => {
  res.send('OK');
});

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.resolve('client/dist/bundle.js'));
});

//app.use('/restaurants', restaurantsRouter);

app.use('/api/restaurants', restaurantsApiRouter);

app.get('/api/restaurants/:id/string', (req, res) => {
    console.log('Service req id: ', req.params.id);
    getRestaurantById(req.params.id).then((result) => {
      res.send(ReactDOM.renderToString(<App restaurant={result} />) + '%$%$^^%$%$' + JSON.stringify(result));
    }).catch((err) => {
      console.error('Failed to fetch restaurant data from server:', err);
    });
});

var port = process.env.PORT || 3003;
app.listen(port, () => { console.log('Listening on http://localhost:' + port); });
