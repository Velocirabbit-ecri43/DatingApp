const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const userController = require('./userController.js');

const app = express();
const PORT = process.env.PORT || 3000; // keep open

app.use(cors()); // look into
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Welcome to Dating App'); // You can customize this response
});

//register USER  /// move to controller
app.post('/signup', userController.signUpUser, (req, res) => {
  return res.status(200).json(res.locals.newUser);
});

//LOGIN  --> test if user exists (for now, later check for password)
app.post('/login', userController.logInUser, (req, res) => {
  return res.status(200).json(res.locals.userInfo);
});

///This might be where we fix the SIKE page
app.get('/matches', userController.getMatches, (req, res) => {
  return res.status(200).json(res.locals.matches);
});

// app.get('/interests', async (req, res) => {
//   const interests = await pool.query('SELECT interest FROM personal_interests');
//   console.log(interests.rows);
// });

//sike page:
app.get('/connect', async (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/SIKE.html'));
});

app.get('/search', async (req, res) => {
  //expect input
  //expect output
  const { preference1, preference2, preference3 } = req.query;
  const interestArr = [preference1, preference2, preference3];

  // create object to store user interests
  const userInterests = {};

  try {
    // Fetch users with each interest -> take it one interest at a time ->
    for (const preference of interestArr) {
      const usersWithInterest = await pool.query(
        //keep same query string we were using before ->
        'SELECT users.username, personal_interests.interest FROM users JOIN personal_interests ON users.id = personal_interests.user_id WHERE personal_interests.interest = $1',
        [preference]
      );

      // Iterate through the users with the current interest
      for (const user of usersWithInterest.rows) {
        //set username to user.username
        const username = user.username;
        //set interest to user.interest
        const interest = user.interest;

        // If the user already exists in userInterests, update their interests
        if (userInterests[username]) {
          userInterests[username].push(' , ' + interest);
        } else {
          // If the user doesn't exist, create  new entry
          userInterests[username] = [interest];
        }
      }
    }

    // Convert userInterests object to an array for response, MAP username and interest
    const output = Object.entries(userInterests).map(
      ([username, interest]) => ({
        username,
        interest,
      })
    ); //output is now an array of objects; where usernam is username and interest is the array of interests

    //RESPONSE
    //no users found check
    if (output.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    } else {
      //if users found, we need to write output to storage.txt
      fs.writeFileSync('./server/public/storage.txt', JSON.stringify(output));
      res.redirect('http://localhost:8080/'); // redirect to '/' route
      // res.status(200).send("Hi Hadrian");
    }
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Unknown route handler
app.use('*', (req, res) => res.status(404));

//Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
