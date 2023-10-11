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

const testQuery = async (query) => {
  const pool = new Pool({
    connectionString: process.env.URL,
  });

  try {
    await pool.connect();
    return await pool.request().query(`
      BEGIN TRANSACTION
      ${query}
      ROLLBACK TRANSACTION
    `);
  } finally {
    await pool.release();
  }
};

describe("Register works okay!", () => {
  describe('POST request to "/register" creates new user in database', () => {
    const createNewUser = `
      INSERT INTO users (username, password, skillLevel, focus)
    VALUES ("testUser", "testPW", "testLevel", "testFocus");`;

    it("Should create a new user", async () => {
      const { newUser } = await testQuery(`${createNewUser};
        SELECT username, password, skillLevel, focus FROM users
        WHERE username = 'testname';`);

      console.log("newUser: ", newUser);

      expect(newUser).toStrictEqual([
        expect.objectContaining({
          username: "testuser",
          password: "testPW",
          skillLevel: "testLevel",
          focus: "testFocus",
        }),
      ]);
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
