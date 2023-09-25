const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const dayjs = require('dayjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto')
require('dotenv').config({path: './.env'});
const connection = mysql.createPool({
  host     : 'localhost',
  user     : process.env.dbUser,
  password : process.env.dbPassword,
  database : process.env.dbName
});

const sendEmail = (mailOptions)=>{
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kinobuchung@gmail.com',
      pass: 'zqwhrsqhtcnunefq'
    }
  });
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

  const generatePassword = (
    length = 10,
    characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
  ) =>{
    return Array.from(crypto.randomFillSync(new Uint32Array(length)))
      .map((x) => characters[x % characters.length])
      .join('')
  }

// Starting our app.
const app = express();
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
// Creating a GET route that returns data from the 'users' table.
app.get('/users', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM Users', function (error, results, fields) {
      connection.release();
      // If some error occurs, we throw an error.
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send('Error executing query');
        return;
      }
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
    connection.release();
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).send('Error executing query');
      return;
    }
    console.log(results)
    res.send(results)
  });
});
});

app.post('/userByShort', (req, res) => {
  connection.getConnection(function (err, connection) {
  const loginQuery = 'SELECT * FROM Users WHERE short = "' + req.body.short + '"' 
  connection.query(loginQuery, function (error, results, fields) {
    connection.release();
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).send('Error executing query');
      return;
    }
    console.log(results)
    res.send(results)
  });
});
})

app.post('/editUser', (req, res) => {
  connection.getConnection(function (err, connection) {
  const loginQuery = 'UPDATE Users SET '+
  'title = "' + req.body.title + '",'+
  'firstName = "' + req.body.firstName + '",'+
  'lastName = "' + req.body.lastName + '",'+
  'mailAddress = "' + req.body.mailAddress + '",'+
  'phoneNumber = "' + req.body.phoneNumber + '",'+
  'birthDate = "' + req.body.birthDate + '",'+
  'role = "' + req.body.role + '"'+
  'WHERE short = "' + req.body.short + '"' 
  connection.query(loginQuery, function (error, results, fields) {
    connection.release();
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).send('Error executing query');
      return;
    }
    console.log(results)
    res.send(results)
  });
});
})

app.post('/editItem', (req, res) => {
  connection.getConnection(function (err, connection) {
  const updateItemQuery = 'UPDATE Items SET '+
  'type = "' + req.body.type + '",'+
  'name = "' + req.body.name + '",'+
  'description = "' + req.body.description + '",'+
  'storageSite = "' + req.body.storageSite + '",'+
  'dateOfPurchase = "' + req.body.dateOfPurchase + '" ' +
  'WHERE ID = "' + req.body.id + '"' 
  console.log(updateItemQuery)
  connection.query(updateItemQuery, function (error, results, fields) {
    connection.release();
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).send('Error executing query');
      return;
    }
    console.log(results)
    res.send(results)
  });
});
})

app.put('/lendItem', (req, res) => {
  console.log(req.body);
  connection.getConnection(function(err, connection) {
      if (err) {
          console.error("Error establishing connection:", err);
          res.status(500).send('Error establishing connection to database');
          return;
      }

      const lendItemQuery = 'UPDATE Items SET ' +
          'user_short = ?, ' +
          'storageSite = "lent" ' +
          'WHERE ID = ?';
      console.log(lendItemQuery);

      connection.query(lendItemQuery, [req.body.user_short, req.body.id], function(error, results, fields) {
          // Release the connection
          connection.release();

          if (error) {
              console.error("Error executing query:", error);
              res.status(500).send('Error executing query');
              return;
          }

          console.log(results);
          res.send(results);
      });
  });
});

app.put('/returnItem', (req, res) => {
  console.log(req.body);
  connection.getConnection(function(err, connection) {
    if (err) {
        console.error("Error establishing connection:", err);
        res.status(500).send('Error establishing connection to database');
        return;
    }

    const returnItemQuery = 'UPDATE Items SET ' +
        'user_short = null, ' +
        'storageSite = "Storage Room 2" ' +
        'WHERE ID = ?';
    console.log(returnItemQuery);

    connection.query(returnItemQuery, [req.body.id], function(error, results, fields) {
        // Release the connection
        connection.release();

        if (error) {
            console.error("Error executing query:", error);
            res.status(500).send('Error executing query');
            return;
        }

        console.log(results);
        res.send(results);
    }
    );
  });
});


app.put('/returnItemFast', (req, res) => {
  console.log(req.body);
  connection.getConnection(function(err, connection) {
      if (err) {
          console.error("Error establishing connection:", err);
          res.status(500).send('Error establishing connection to database');
          return;
      }

      const lendItemQuery = 'UPDATE Items SET ' +
          'user_short = ?, ' +
          'storageSite = "lent" ' +
          'WHERE ID = ?';
      console.log(lendItemQuery);

      connection.query(lendItemQuery, [req.body.user_short, req.body.id], function(error, results, fields) {
          if (error) {
              console.error("Error executing query:", error);
              res.status(500).send('Error executing query');
              return;
          }

         
          const updateUserPointsQuery = 'UPDATE Users SET ' +
              'fastReturnPoints = fastReturnPoints - 1 ' +
              'WHERE short = ?';
          
          connection.query(updateUserPointsQuery, [req.body.user_short], function(error, userResults) {
              connection.release();

              if (error) {
                  console.error("Error executing query on Users table:", error);
                  res.status(500).send('Error executing query on Users table');
                  return;
              }

              console.log(userResults);
              res.send(results);
          });
      });
  });
});

app.get('/getFastReturnPoints', (req, res) => {
  const userShort = req.query.user_short; 

  if (!userShort) {
      return res.status(400).send('Missing user_short parameter');
  }

  connection.getConnection(function(err, connection) {
      if (err) {
          console.error("Error establishing connection:", err);
          res.status(500).send('Error establishing connection to database');
          return;
      }

      const getPointsQuery = 'SELECT fastReturnPoints FROM Users WHERE short = ?';

      connection.query(getPointsQuery, [userShort], function(error, results, fields) {
          connection.release();

          if (error) {
              console.error("Error executing query:", error);
              res.status(500).send('Error executing query');
              return;
          }

          if (results.length > 0) {
              res.json({ fastReturnPoints: results[0].fastReturnPoints });
          } else {
              res.status(404).send('User not found');
          }
      });
  });
});



app.post('/deleteItem', (req, res) => {
  connection.getConnection(function (err, connection) {
  const queries = [
  'DELETE FROM Audit WHERE item_ID = "' + req.body.id+ '"',
  'DELETE FROM Damages WHERE item_ID = "' + req.body.id+ '"',
  'DELETE FROM Reservations WHERE item_ID = "' + req.body.id+ '"',
  'DELETE FROM Items WHERE ID = "' + req.body.id+ '"'
  ]
  console.log(queries)
  let result
  for(const query of queries){
    connection.query(query, function (error, results, fields) {
      if (error) {
        connection.release()
        console.error("Error executing query:", error);
        res.status(500).send('Error executing query');
        return;
      }
      console.log(results)
      result=results
    });
  res.status(200).send()
  connection.release();
  }
});
})

app.post('/addUser', async (req, res) => {
  connection.getConnection(function (err, connection) {
    const existingUserQuery = 'SELECT * FROM Users WHERE short = "' + req.body.short + '"'
    connection.query(existingUserQuery, function (error, existingUserResults, fields) {
      if (error) {
        connection.release()
        console.error("Error executing query:", error);
        res.status(500).send('Error executing query');
        return;
      }
      console.log(existingUserResults)
      if(existingUserResults.length>0){
        connection.release();
        res.send({existingUser : true})
        return
      }else{
        const password = generatePassword() 
        console.log(password)
        const addUserQuery = 'Insert INTO Users (short, lastName, firstName, title, mailAddress, phoneNumber, birthDate, password, role, fastReturnPoints) VALUES("'
        + req.body.short +'","'
        + req.body.lastName+'","'
        + req.body.firstName+'","'
        + req.body.title+'","'
        + req.body.mailAddress+'","'
        + req.body.phoneNumber+'","'
        + req.body.birthDate+'","'
        + password+'","'
        + req.body.role+'", "3")'
        console.log(addUserQuery)
        connection.query(addUserQuery, function (error, results, fields) {
          connection.release();
          if (error) {
            console.error("Error executing query:", error);
            res.status(500).send('Error executing query');
            return;
          }
          console.log(results)
          //Send Email with login data
          const text = 'Sehr geehrte:r '+ req.body.title + " " + req.body.firstName + " " + req.body.lastName + "\nSie wurden erfolgreich dem Leihverwaltungssystem ihrer Schule hinzugefügt. Im Folgenden finde sie ihre Anmeldedaten: \nKürzel: " + req.body.short + "\nPasswort: " + password
          const mailOptions = {
            from: 'kinobuchung@gmail.com',
            to: req.body.mailAddress,
            subject: 'Sie wurden erfolgreich für das Verleihsystem registriert',
            text: text
          };
          sendEmail(mailOptions)
          
          res.send(results)
        });
      }
    });
  });
});

app.post('/addItem', async (req, res) => {
  connection.getConnection(function (err, connection) {
    const addItemQuery = 'Insert INTO Items (type, name, description, image, dateOfPurchase, storageSite) VALUES("'
    + req.body.type +'","'
    + req.body.name+'","'
    + req.body.description+'","'
    + req.body.image+'","'
    + req.body.dateOfPurchase+'","'
    + req.body.storageSite+'")'
    console.log(addItemQuery)
    connection.query(addItemQuery, function (error, results, fields) {
      if (error) {
        connection.release()
        console.error("Error executing query:", error);
        res.status(500).send('Error executing query');
        return;
      }
      console.log(results)
      if(results && req.body.damages && req.body.damages != null){
        let itemID = results.insertId
        let date = dayjs().format('YYYY-MM-DD')
        let addDamagesQuery = 'INSERT INTO Damages (item_ID, damageDescription, date) VALUES '
        let splitDamages = req.body.damages.split('\n')
        for(const damage of splitDamages){
          addDamagesQuery = addDamagesQuery + '("' +itemID + '","' + damage + '","' + date + '"),'
        }
        addDamagesQuery = addDamagesQuery.substring(0,addDamagesQuery.length-1)
        connection.query(addDamagesQuery, function (error, results, fields) {
          if (error) {
            connection.release()
            console.error("Error executing query:", error);
            res.status(500).send('Error executing query');
            return;
          }
        console.log(results)
        });
        }
      connection.release();
      res.status(200).send({'Response':'Succesfully inserted Item'})
    });
  });
});

app.get('/itemsList', async (req, res) => {
  // Connecting to the database.
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT ID, type, name, user_short FROM Items', function (error, results, fields) {
      connection.release();
      // If some error occurs, we throw an error.
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send('Error executing query');
        return;
      }
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.post('/itemsForUser', async (req, res) => {
  connection.getConnection(function (err, connection) {
    const itemForUserQuery = 'SELECT * FROM Items WHERE user_short = "' + req.body.short + '"'
    connection.query(itemForUserQuery, function (error, results, fields) {
      connection.release();
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send('Error executing query');
        return;
      }
      console.log(results)
      res.send(results)
    });
  });
});

app.post('/reservedItemsForUser', async (req, res) => {
  connection.getConnection(function (err, connection) {
    const itemForUserQuery = 'SELECT i.ID, i.name, i.type, r.ID AS reservationID FROM Items i INNER JOIN Reservations r ON i.ID = r.item_ID WHERE r.user_short = "' + req.body.short +  '" AND r.dateFrom >="' + dayjs().format('YYYY-MM-DD') + '"'
    connection.query(itemForUserQuery, function (error, results, fields) {
      connection.release();
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send('Error executing query');
        return;
      }
      console.log(results)
      res.send(results)
    });
  });
});

app.post('/itemById', async (req, res) => {
  // Connecting to the database.
  // Connecting to the database.
  connection.getConnection(function (err, connection) {
    // Executing the MySQL query (select all data from the 'users' table).
    const itemsQuery = 'SELECT i.type, i.name, i.description, i.image, i.dateOfPurchase, i.storageSite, i.qrCode, u.title, u.firstName, u.lastName, (SELECT GROUP_CONCAT(damageDescription SEPARATOR "\n") FROM damages WHERE item_ID = "'+ req.body.id+'") AS damages FROM Items i LEFT JOIN users u on i.user_short = u.short WHERE i.id = "' + req.body.id + '"'
    console.log(itemsQuery)
    connection.query(itemsQuery, function (error, results, fields) {
      connection.release();
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).send('Error executing query');
        return;
      }
      // If some error occurs, we throw an error.
      console.log(results)
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

app.get('/damagesList', async (req, res) => {
  try {
    connection.getConnection(function (err, connection) {
      // Execute a SQL query to join the Items and Damages tables
      const query = `
        SELECT 
          Damages.damageDescription, 
          Damages.ID AS damageID,
          Damages.date AS damageDate, 
          Items.name AS itemName, 
          Items.description AS itemDescription 
        FROM Damages
        INNER JOIN Items ON Damages.item_ID = Items.ID
        ORDER BY Damages.date DESC
      `;

      // Run the query
      connection.query(query, function (error, results, fields) {
        connection.release();
        if (error) {
          throw error;
        }

        // Send the results as JSON response
        res.json(results);
      });
    })
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/users so you can see the data.');
});