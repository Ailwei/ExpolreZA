import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes/route';
import path from 'path';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});