import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const createUser = async (user) => {
  const { fullName, email, phone, county, residentialAddress, refereesID, passwordHash } = user;
  const result = await pool.query(
    `INSERT INTO users (full_name, email, phone, county, residential_address, refereesID, password)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [fullName, email, phone, county, residentialAddress, refereesID, passwordHash]
  );
  return result.rows[0];
};

export const getUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};
