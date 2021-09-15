// Import Express
import express from "express";
const app = express();
//Import Morgan
import morgan from "morgan";

app.use(express.json());
app.use(morgan('dev'));

//Routes
import tokenRoute from '../routes/token.routes';
app.use('/v2/token', tokenRoute);

import playerRoute from '../routes/player.routes';
app.use('/v2/player', playerRoute);
export default app;