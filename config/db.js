var mysql=require('mysql');

//Db connection start
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'car_station'
  });
  connection.connect(function(err)
  {
    if(err)
    {
      console.log("Error while Mysql Connection:");
    }
    else
    {
      console.log("Connection Successfull:");
    }
  });
  //Db connection end

  module.exports = connection;