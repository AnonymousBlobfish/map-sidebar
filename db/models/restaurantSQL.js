var Promise = require('bluebird');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'wegot'
});

connection.connect();

var find = (queryObj) => {
  return new Promise(function(resolve, reject) {
     connection.query('SELECT * FROM restaurants WHERE id=' + queryObj.id, function(err, data) {
       return (err ? reject(err) : resolve(data));
     });
  });
};

exports.find = find;