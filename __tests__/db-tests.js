/*
Todo:
- Create testing database
What we'd like to test:
- Register/Sign Up
  - return



*/
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

// create function to allow a transaction with a passed in query
const testQuery = async (queryStr) => {
  // create new pool
  const pool = new Pool({
    connectionString: process.env.URL,
  });

  // specify client
  const client = await pool.connect();

  try {
    // transaction starts here
    await client.query(`BEGIN`);
    const res = client.query(queryStr);
    await client.query("ROLLBACK");
    return res;
  } catch {
    // error
    console.log("error at database in tests");
    // close client
    await client.release();
    // close pool
    await pool.end();
  } finally {
    // close client
    await client.release();
    // close pool
    await pool.end();
  }
};

describe("Register works okay!", () => {
  describe('POST request to "/register" creates new user in database', () => {
    // query to insert user
    const createNewUser = `
      INSERT INTO users (username, password, skill_level, focus)
      VALUES ('testUser', 'testPW', 'testLevel', 'testFocus') RETURNING username, password, skill_level, focus;`;

    it("Should create a new user", async () => {
      // use transaction to test inserting user
      const newUser = await testQuery(createNewUser);

      // console.log("newUser.rows[0]", newUser.rows[0]);

      expect(newUser.rows[0]).toStrictEqual({
        username: "testUser",
        password: "testPW",
        skill_level: "testLevel",
        focus: "testFocus",
      });
    });
  });
});

describe("READ functionality!", () => {
  describe('GET request to "/matches" fetches matches for user', () => {
    //create user - setupQuery
    //create match1 - testLevel in common - setupQuery
    //create match2 - focus in common - setupQuery
    //create match 3 - language in common - setupQuery

    //then: pull matches using select, return array of match objects? - testQuery

    const createAndFindMatches = `
    WITH inserted_users AS (
      INSERT INTO users (username, password, skill_level, focus)
      VALUES ('testUser5', 'testPW', 'mainLevel', 'testFocus1'), ('testUser6', 'testPW', 	'testLevel1', 	'mainFocus') RETURNING username, password, skill_level, focus
    ), mainUser AS (
      INSERT INTO users (username, password, skill_level, focus) 
      VALUES ('mainUser', 'mainPW', 'mainLevel', 'mainFocus') RETURNING username, password, skill_level, focus)
    SELECT inserted_users.username, inserted_users.skill_level, inserted_users.focus FROM inserted_users, mainUser 
    WHERE inserted_users.focus = mainUser.focus OR inserted_users.skill_level = mainUser.skill_level LIMIT 10;`;

    it("Should create a new user", async () => {
      const matches = await testQuery(createAndFindMatches);

      // console.log("matches.rows[0]", matches.rows[0]);

      expect(matches.rows).toStrictEqual([
        {
          username: "testUser5",
          skill_level: "mainLevel",
          focus: "testFocus1",
        },
        {
          username: "testUser6",
          skill_level: "testLevel1",
          focus: "mainFocus",
        },
      ]);
    });
  });
});

// Old code:

// it("Should return maximum MasterRetailPrice", async () => {
//   const { recordset } = await testQuery(`
//       -- Initializing database state
//       TRUNCATE TABLE UpcCollisionReport;
//       INSERT INTO UpcCollisionReport (MasterRetailPrice)
//       VALUES (3), (5), (1), (2), (4);
//       ${selectMaxRetailPriceMSSQL}
//   `);
//   expect(recordset).toStrictEqual([
//     expect.objectContaining({ MasterRetailPrice: 5 }),
//   ]);
// });
