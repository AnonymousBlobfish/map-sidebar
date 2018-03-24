var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var restaurantsRouter = require('./routers/restaurants.js');
var restaurantsApiRouter = require('./routers/restaurants_api.js');
var axios = require('axios');

import React from 'react';
import ReactDOM from 'react-dom/server';
import { App } from '../client/src/app.jsx';

app.use(cors());
app.use(bodyParser.json());
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
    axios.get('http://localhost:3003/api/restaurants/' + req.params.id + '/sidebar')
      .then((response) => {
      res.send(ReactDOM.renderToString(<App restaurant={response.data} />) + '%$%$^^%$%$' + JSON.stringify(response.data));
      }).catch((err) => {
        console.error('Failed to fetch restaurant data from server:', err);
      });
});

var port = process.env.PORT || 3003;
app.listen(port, () => { console.log('Listening on http://localhost:' + port); });
