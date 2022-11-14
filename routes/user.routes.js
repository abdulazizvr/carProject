const router = require('express').Router();
const {GET,POST,PUT,DELETE} = require('../controllers/users');

router
    .get('/users',GET)
    .get('/users/:id',GET)
    .post('/users',POST)
    .put('/users/:id',PUT)
    .delete('/users/:id',DELETE)

module.exports = router