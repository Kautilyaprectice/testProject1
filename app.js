const express = require('express');
const bodyParser = require('body-parser');
const playerRoutes = require('./routes/player');
const sequelize = require('./util/database');

const app = express();

app.use(bodyParser.json());

app.use('/player' , playerRoutes);

(async () => {
    try {
        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to sync models with the database:', error);
    }
})();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});