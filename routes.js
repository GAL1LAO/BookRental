const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dayjs = require('dayjs');
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

app.post('/addUser', async (req, res) => {
  connection.getConnection(function (err, connection) {
    const existingUserQuery = 'SELECT * FROM Users WHERE short = "' + req.body.short + '"'
    connection.query(existingUserQuery, function (error, existingUserResults, fields) {
      if (error) throw error;
      console.log(existingUserResults)
      if(existingUserResults.length>0){
        res.send({existingUser : true})
        return
      }
    });
    const addUserQuery = 'Insert INTO Users (short, lastName, firstName, title, mailAddress, phoneNumber, birthDate, password, role) VALUES("'
    + req.body.short +'","'
    + req.body.lastName+'","'
    + req.body.firstName+'","'
    + req.body.title+'","'
    + req.body.mailAddress+'","'
    + req.body.phoneNumber+'","'
    + req.body.birthDate+'","'
    + req.body.password+'","'
    + req.body.role+'")'
    console.log(addUserQuery)
    connection.query(addUserQuery, function (error, results, fields) {
      if (error) throw error;
      console.log(results)
      res.send(results)
    });
  });
});


app.get('/itemsList', async (req, res) => {
  // Connecting to the database.
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT ID, type, name, user_short FROM Items', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.post('/itemsForUser', async (req, res) => {
  connection.getConnection(function (err, connection) {
    const itemForUserQuery = 'SELECT * FROM Items WHERE user_short = "' + req.body.short + '"'
    connection.query(itemForUserQuery, function (error, results, fields) {
      if (error) throw error;
      console.log(results)
      res.send(results)
    });
  });
});

app.post('/reservedItemsForUser', async (req, res) => {
  connection.getConnection(function (err, connection) {
    const itemForUserQuery = 'SELECT i.ID, i.name, i.type, r.ID AS reservationID FROM Items i INNER JOIN Reservations r ON i.ID = r.item_ID WHERE r.user_short = "' + req.body.short +  '" AND r.dateFrom >="' + dayjs().format('YYYY-MM-DD') + '"'
    connection.query(itemForUserQuery, function (error, results, fields) {
      if (error) throw error;
      console.log(results)
      res.send(results)
    });
  });
});
  
//   try {
//     const items = await db.Item.findAll({
//       attributes: ['type', 'user_short'],
//     });
//     res.json(items);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/users so you can see the data.');
});
