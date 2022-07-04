import Users from './routes';
import express from 'express';
import { SectionService } from '../services';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(Users);
app.get('/test', (req, res) => {
    res.send('Its working');
});
app.get('/verify', async (req, res) => {
    res.send(await new SectionService().verify(req));
});
app.get('/get', async (req, res) => {
    res.send(await new SectionService().get(req));
});

export default app;
