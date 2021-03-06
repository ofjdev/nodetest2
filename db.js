var mysql = require('mysql');

var DbUserName = "root";
var DbPassword = "";
var DbName = "concertsdb";
var DbHost = "localhost";

global.connectionWorked = false;

var dbParams = {
	host: DbHost,
	database: DbName,
	user: DbUserName,
	password: DbPassword
};

var con = mysql.createConnection(dbParams); // con.end();
console.log("Connected successfully to DB with\n"+formatDB_Info());


function formatDB_Info(){
	return "[User='"+DbUserName+"'; Pass='"+DbPassword+
		 "'; DB='"+DbName+"'; Host='"+DbHost+"']";
}

// INSERT INTO `concert` (`idConcert`, `ConcertName`, `InterpretName`, `Place`, `Time`) VALUES (NULL, 'Després de tot', 'Manu Guix', 'Razmatazz', '2018-02-16 21:00:00');
exports.getConcerts = function(callback){
	con.connect(function(err) {
  		if (err) callback(null); //throw err;
  		else
  		//Select all customers and return the result object:
  			con.query("SELECT * FROM concert", function (err, result, fields) {
    			if (err) callback(null); //throw err;
    			else {
    				//var JsonObj = getJsonFromFields(result[0], fields);
    				//console.log("Result: ");
    				//console.log(result);

    				//console.log("Fields: ");
    				//console.log(getFieldNames(fields));

    				//console.log("Result2: ")
    				//console.log(JsonObj);
//    				console.log("is array?" + (R instanceof Array));
    				//callback([JsonObj]);
    				callback(result);
    			}
  			});
	});
}

//function getFieldNames(fields){
//	var fieldNames = [];
//	for (var i = fields.length - 1; i >= 0; i--) {
//		fieldNames.concat(fields[i].name);
//	}
//	return fieldNames;
//}

//function getJsonFromFields(result, fields){
//	var obj = {}
//	for (var i = fields.length - 1; i >= 0; i--) {
//		var fieldName = fields[i].name;
//		obj[fieldName] = result[fieldName];
//	}
//	return obj;
//}

exports.testConnectionDB = function(){
	
	// NOTE: if fails, probably throws an exception
	// TODO: Study reusing connections

	var res = con.connect(); // assuming that 'connect' will never fail
}

function waitMilliseconds(millis){
	var waitTill = new Date(new Date().getTime() + millis);
	while(waitTill > new Date()){}
}
