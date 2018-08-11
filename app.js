const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./database/connection');
const dbConfig = require('./config/db.config');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/spa.html');
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
