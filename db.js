var mssql = require('mssql');
var dbConfig = {
	user: 'SPM_Agent',
	password: 'spm5445',
	server: 'spm-sql',
	database: 'SPM_Database'
};

var connection = mssql.connect(dbConfig, function(err) {
	if (err) throw err;
});

module.exports = connection;
var sqlDb = require('mssql');

exports.executeSql = function(sql, callback) {
	var conn = new sqlDb.Connection(dbConfig);
	conn
		.connect()
		.then(function() {
			var req = new sqlDb.Request(conn);
			req
				.query(sql)
				.then(function(recordset) {
					callback(recordset);
				})
				.catch(function(err) {
					console.log(err);
					callback(null, err);
				});
		})
		.catch(function(err) {
			console.log(err);
			callback(null, err);
		});
};
