const router = require('express').Router();
const {GET,POST,PUT,DELETE} = require('../controllers/cars');

router
    .get('/cars',GET)
    .get('/cars/:id',GET)
    .post('/cars',POST)
    .put('/cars/:id',PUT)
    .delete('/cars/:id',DELETE)

module.exports = router