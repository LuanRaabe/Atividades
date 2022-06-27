import Users from './users';
import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(Users);
app.get('/test', (req, res) => {
    res.send('Its working');
});

export default app;
