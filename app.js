require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/db/models');

const app = express();
const port = process.env.PORT;
const basePath = '/api';

/**
 * Middlewares que usa el servidor
 */
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//b2deb1fc-e53a-4ad8-98c2-76aed09215ff
//b7f297fd-9222-4329-b8cb-fd7f94d7454a
/**
 * Rutas de la api
 */
app.use(basePath, require('./src/routes/user.routes'));
app.use(basePath, require('./src/routes/band.routes'));
app.use(basePath, require('./src/routes/tab.routes'));
app.use(basePath, require('./src/routes/song.routes'));
app.use(basePath, require('./src/routes/favourites.routes'));

/**
 * Método que inicia el servidor
 */
app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
    await sequelize.authenticate();
    console.log('Database connected');
 }
);



