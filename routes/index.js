const express = require('express');
const path = require('path');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('index route fired');
  res.sendFile(path.resolve(__dirname + '/client-app/dist/index.html'));
});

module.exports = router;
