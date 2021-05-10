require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

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

/**
 * Rutas de la api
 */
app.use(basePath, require('./routes/user.routes'));
app.use(basePath, require('./routes/tab.routes'));
/**
 * Método que inicia el servidor
 */
app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
    await sequelize.authenticate();
    console.log('Database connected');
 }
);



