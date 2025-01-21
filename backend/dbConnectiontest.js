import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { Client } from 'pg';

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect()
    .then(() => {
        console.log('Connected to the database successfully!');
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });

app.post('/create-account', (req, res) => {
    const { username, email, recommender_id } = req.body;

    const query = `
        INSERT INTO public.users (username, email, Recommender_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

    client.query(query, [username, email, recommender_id])
        .then(result => {
            res.status(201).json(result.rows[0]);
        })
        .catch(err => {
            console.error('Error creating account:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
