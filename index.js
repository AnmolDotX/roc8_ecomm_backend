import dotenv from 'dotenv';
import express from 'express'
import {connectDB} from './connectDB.js';
import {sendOTP, validateOTP} from './controller.js'

dotenv.config({
    path : './.env'
});
export const db = connectDB();

const app = express();
const port = 8000;

app.use(express.json());

// API endpoints
app.post('/sendotp', sendOTP);
app.post('/validateotp', validateOTP);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
