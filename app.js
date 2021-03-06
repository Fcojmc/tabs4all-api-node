require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const { apiErrorHandler } = require('./src/middlewares/api-error-handler');
const { sequelize } = require('./src/db/models');

const app = express();
const port = process.env.PORT;
const basePath = '/api';

/**
 * Middlewares base
 * @function use
 */
app.use(express.static('public'));
app.use(cors());
app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

/**
 * Seteo de rutas
 * @function use
 */
app.use(basePath, require('./src/routes/auth.routes'));
app.use(basePath, require('./src/routes/user.routes'));
app.use(basePath, require('./src/routes/band.routes'));
app.use(basePath, require('./src/routes/tab.routes'));
app.use(basePath, require('./src/routes/song.routes'));
app.use(basePath, require('./src/routes/favourites.routes'));

/**
 * Manejo de errores global mediante custom middleware
 * @function apiErrorHandler
 */
 app.use(apiErrorHandler);

/**
 * Levantar servidor
 */
app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
    await sequelize.authenticate();
    console.log('Database connected');
});