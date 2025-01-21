import pkg from 'pg';
const { Client } = pkg;


const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'kiptach_lending',
  password: 'Calief,8210',
    port: 5432,

});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database!');
    return client.query('SELECT NOW()');
  })
  .then((res) => {
    console.log('Current time:', res.rows[0]);
  })
  .catch((err) => {
    console.error('Connection error', err.stack);
  })
  .finally(() => {
    client.end();
  });
