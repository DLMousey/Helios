const express = require('express');
const router = express.Router();
let database = require('../database/connection');

router.get('/errors', (req, res) => {
    let collection = database.get().db('helios').collection('errors');
    collection.find().toArray((err, data) => {
        res.json(data);
    });
});

router.post('/errors', (req, res) => {
    let collection = database.get().db('helios').collection('errors');
    collection.save(req.body, (err, result) => {
        if(err) return res.json('Unable to save to db');
        res.json(result);
    });
});

module.exports = router;