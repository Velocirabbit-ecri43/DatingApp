const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const URI = process.env.URI;

const userController = {};

const pool = new Pool({
  connectionString: URI,
});

console.log('process.env: ', URI);

//User middleware

userController.signUpUser = async (req, res, next) => {
  const { username, password, lang, focus, skill } = req.body;

  //handle case of missing username or password in req.body
  if (!username || !password) {
    return next({
      log: `userController.logInUser: ERROR: no username or pw in req.body`,
      message: `Error: username and/or password requried`,
      status: 412,
    });
  }

  try {
    // Insert the user into the 'users' table
    const createNewUser = await pool.query(
      'INSERT INTO users (username, password, focus, skill_level) VALUES ($1, $2, $3, $4) RETURNING username, focus, skill_level',
      [username, password, focus, skill]
    );

    // Extract the newly generated user object
    const newUser = createNewUser.rows[0];
    res.locals.newUser = newUser;
    return next();
  } catch (error) {
    return next({
      log: `userController.signUpUser: ERROR: ${error}`,
      message: `${error}: unable to create user`,
      status: 500,
    });
  }
};

userController.logInUser = async (req, res, next) => {
  const { username, password } = req.body;

  //handle case of missing username or password in req.body
  if (!username || !password) {
    return next({
      log: `userController.logInUser: ERROR: no username or pw in req.body`,
      message: `Error: invalid input`,
      status: 412,
    });
  }

  // get user matching username and password
  try {
    const checkUser = await pool.query(
      `SELECT username, focus, skill_level FROM users WHERE username = $1 AND password = $2`,
      [username, password]
    );

    // check return value to see if the login was correct
    if (checkUser.length > 1) {
      return next({
        log: `userController.logInUser: ERROR: more than one user with that username or password`,
        message: `Could not log in`,
        status: 500,
      });
    } else if (checkUser.length === 0) {
      return next({
        log: `userController.logInUser: ERROR: username or password incorrect`,
        message: `Username and/or password incorrect.`,
        status: 412,
      });
    } else {
      // save user data into res.locals
      res.locals.userInfo = checkUser.rows[0];
      return next();
    }
  } catch (error) {
    return next({
      log: `userController.logInUser: ERROR: ${error}`,
      message: `${error}: unable to log user in`,
      status: 500,
    });
  }
};

userController.getMatches = async (req, res, next) => {
  const { username } = req.params;

  // handle case of no username in params
  if (!username) {
    return next({
      log: `userController.getMatches: ERROR: no username in req.params`,
      message: `Error: invalid input`,
      status: 412,
    });
  }

  // get user data from database
  try {
    const getMatches = await pool.query(
      `
    WITH mainUser AS (
      SELECT username, skill_level, focus FROM  users
      WHERE  username = $1
    ) 
    SELECT username, skill_level, focus from users 
    WHERE users.focus = mainUser.focus OR _users.skill_level = mainUser.skill_level AND users.username <> mainUser.username;`,
      [username]
    );
    // save match data in res.locals
    res.locals.matches = getMatches.row;
    return next();
  } catch (error) {
    return next({
      log: `userController.getMatches: ERROR: ${error}`,
      message: `${error}: unable to access matches`,
      status: 500,
    });
  }
};

module.exports = userController;
//OLD CODE FOR SECOND TABLE INSERT
// // Insert user's personal interests into the 'personal_interests' table
// if (Array.isArray(personalInterests)) {
//   for (const personalInterest of personalInterests) {
//     await pool.query(
//       "INSERT INTO personal_interests (user_id, interest) VALUES ($1, $2)",
//       [userId, personalInterest]
//     );
//   }
