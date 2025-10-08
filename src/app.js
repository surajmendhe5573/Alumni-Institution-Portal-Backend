import express from 'express';
import cors from 'cors';

import notFound from './middlewares/default/notFound.js';
import errorHandler from './middlewares/default/errorHandler.js';
import morgan from 'morgan';
import helmet from 'helmet';
import { responseFormatter } from './middlewares/default/responseFormater.js';
import connectDB from './config/db.js';

import compression from 'compression';

const app = express();

app.use(express.json());

// import patientRoutes from './modules/patient/patient.routes.js';

app.use(helmet());
app.use(morgan('dev'));

// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(compression());


connectDB();

app.use(responseFormatter);
app.get('/', (req, res) => {
     res.send('Server is running!');
})
// app.use('/api/v1/patient', patientRoutes);

app.use(notFound);
app.use(errorHandler);


export default app;
