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

const testQuery = async (queryStr, params) => {
  const pool = new Pool({
    connectionString: process.env.URL,
  });

  const client = await pool.connect();

  try {
    await client.query(`BEGIN`);
    const res = client.query(queryStr, params);
    await client.query("ROLLBACK");
    return res;
  } finally {
    await client.release();
  }
};

describe("Register works okay!", () => {
  describe('POST request to "/register" creates new user in database', () => {
    const createNewUser = `
      INSERT INTO users (username, password, skill_level, focus)
    VALUES ('testUser', 'testPW', 'testLevel', 'testFocus') RETURNING username, password, skill_level, focus;`;

    it("Should create a new user", async () => {
      // const newUser = await testQuery(`${createNewUser};
      //   SELECT username, password, skill_level, focus FROM users
      //   WHERE username = 'testUser';`);

      const newUser = await testQuery(createNewUser);

      console.log("newUser.rows[0]", newUser.rows[0]);

      expect(newUser.rows[0]).toStrictEqual({
        username: "testUser",
        password: "testPW",
        skill_level: "testLevel",
        focus: "testFocus",
      });
    });
  });
});

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

// describe("#testing tests", () => {
//   it("adds 2", () => {
//     const add2 = (num) => num + 2;
//     const result = add2(2);
//     expect(result).toBe(4);
//   });
// });
