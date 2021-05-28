require('dotenv').config();
import express, { Application } from 'express';
import db from './src/db/models';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import bandRoutes from './src/routes/band.routes';
import tabRoutes from './src/routes/tab.routes';
import userRoutes from './src/routes/user.routes';
import errorHandler from './src/middlewares/error-handler';


const app: Application = express();
const port: string | undefined = process.env.PORT;
const basePath: string = '/api';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use( fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true
  })
);

app.use(basePath, bandRoutes);
app.use(basePath, userRoutes);
app.use(basePath, tabRoutes);

app.use(errorHandler);

app.listen(port, async () => {
    console.log(`App running on port ${port}`);
    await db.sequelize.authenticate();
    console.log('Database connected');
})