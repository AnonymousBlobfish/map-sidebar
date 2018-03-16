var database = require('../models/restaurantSQL.js');

module.exports = (id) => {
  return database.find({ 'id': id })
    .then((result) => {
      return result[0];
    });
};
