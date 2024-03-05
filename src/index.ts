import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const app = express();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(express.json()); // Use built-in middleware for JSON parsing
app.use(express.urlencoded({ extended: true })); // Use built-in middleware for URL-encoded parsing

const server = http.createServer(app);


server.listen(8080, () => {
  console.log('Server is running at http://localhost:8080/');
})

const MONGO_URL = 'mongodb+srv://raph123:raph123@cluster0.7xwaahm.mongodb.net/TS?retryWrites=true&w=majority'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());