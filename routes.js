const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')
require('dotenv').config({path: './.env'});
const connection = mysql.createPool({
  host     : 'localhost',
  user     : process.env.dbUser,
  password : process.env.dbPassword,
  database : process.env.dbName
});

// Starting our app.
const app = express();
app.use(cors())
app.use(express.json())
// Creating a GET route that returns data from the 'users' table.
app.get('/users', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM Users', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.post('/login', (req, res) => {
  console.log(req.body)
  connection.getConnection(function (err, connection) {
  const loginQuery = 'SELECT * FROM Users WHERE short = "' + req.body.short + '" AND password = "' +req.body.password + '"' 
  connection.query(loginQuery, function (error, results, fields) {
    if (error) throw error;
    console.log(results)
    res.send(results)
  });
});
});



// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/users so you can see the data.');
});
