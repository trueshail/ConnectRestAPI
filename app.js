var express = require('express'); // Web Framework
var app = express();
var sql = require('mssql'); // MS Sql Server client
var morgan = require('morgan'); // MS Sql Server client
var db = require('./db');
app.use(morgan('combined'));
// Connection string parameters.
var sqlConfig = {
	user: 'SPM_Agent',
	password: 'spm5445',
	server: 'spm-sql',
	database: 'SPM_Database'
};

app.get('/', (req, res) => {
	var host = server.address().address;
	var port = server.address().port;
	console.log('app listening at http://%s:%s', host, port);
	res.send('Hello from SPM Connect');
});

app.get('/users', function(req, res) {
	new sql.ConnectionPool(sqlConfig, function() {
		var request = new sql.Request();
		request.query('select * from [SPM_Database].[dbo].[Users]', function(err, recordset) {
			if (err) console.log(err);
			res.json(recordset); // Result in JSON format
		});
	});
});

app.get('/users/:customerId/', function(req, res) {
	new sql.ConnectionPool(sqlConfig, function() {
		var request = new sql.Request();
		var stringRequest = 'select * from [SPM_Database].[dbo].[Users] where id = ' + req.params.customerId;
		request.query(stringRequest, function(err, recordset) {
			if (err) console.log(err);
			res.end(JSON.stringify(recordset)); // Result in JSON format
		});
	});
});

// Start server and listen on http://localhost:8081/
var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('app listening at http://%s:%s', host, port);
});
