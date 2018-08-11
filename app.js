const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./database/connection');
const dbConfig = require('./config/db.config');
const cors = require('cors');

const apiRouter = require('./routes/api');
const indexRouter = require('./routes/index');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname + '/client-app/dist')));

app.use('/api', apiRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client-app/dist/index.html'));
});

db.connect(dbConfig.getUrl(), (err) => {
    if(err) {
        console.log(dbConfig.getUrl());
        console.log('Unable to connect to Mongo');
        process.exit(1);
    } else {
        app.listen(3000, function() {
            console.log('listening on port 3000');
        });
    }
});

module.exports = app;
