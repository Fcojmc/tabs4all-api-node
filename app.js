require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/db/models');

const app = express();
const port = process.env.PORT;
const basePath = '/api';

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(basePath, require('./src/routes/auth.routes'));
app.use(basePath, require('./src/routes/user.routes'));
app.use(basePath, require('./src/routes/band.routes'));
app.use(basePath, require('./src/routes/tab.routes'));
app.use(basePath, require('./src/routes/song.routes'));
app.use(basePath, require('./src/routes/favourites.routes'));

app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
    await sequelize.authenticate();
    console.log('Database connected');
 }
);