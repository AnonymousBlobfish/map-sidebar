var promisify = require('promisify');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'hello',
  database : 'wegot'
});

connection.connect();
var queryPromise = promisify(connection.query);

var find = (queryObj) => {
  return queryPromise('SELECT * FROM RESTAURANTS WHERE id=' + queryObj.id);
};

exports.find = find;