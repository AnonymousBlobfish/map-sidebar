var database = require('../models/restaurantSQLAWS.js');

module.exports = (id) => {
  return database.find({ 'id': id })
    .then((result) => {
      result[0].opening_hours = result[0].opening_hours.split('"').join('').split('~');
      result[0].opening_hours = result[0].opening_hours.map((day) => {
       return day.split('^');
      });
      return result[0];
    });
};
