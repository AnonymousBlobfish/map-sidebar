var database = require('../models/restaurantSQLAWS.js');

module.exports = (id) => {
  return database.find({ 'id': id })
    .then((result) => {
      return result[0];
    });
};
