var Promise = require('bluebird');
var mysql      = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 100,
  host     : '172.31.18.188',
  user     : 'remote',
  password : '',
  database : 'wegot'
});

// CREATE USER 'remote'@'34.224.72.117' IDENTIFIED BY 'MGMT545776';
// GRANT ALL ON wegot.* TO remote@'34.224.72.117';

var find = (queryObj) => {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, connection) {
      connection.query('SELECT * FROM restaurants WHERE id=' + queryObj.id, function(err, data) {
        connection.release();
        return (err ? reject(err) : resolve(data));
      });
    });
  });
};

exports.find = find;
