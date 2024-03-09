const express = require('express')
const router = express.Router()
const authorize = require('../middleware/check-auth').Authenticate
const protect = require('../middleware/authUsermiddleware')

const editConsumer = require('../controllers/consumerControllers/editConsumer')
const deleteConsumer = require('../controllers/consumerControllers/deleteConsumer')
const getAllConsumers = require('../controllers/consumerControllers/getAllConsumers')


router.post('/editConsumer', protect, editConsumer)
router.post("/deleteConsumer",protect, deleteConsumer)
router.get('/getAllConsumer', protect, getAllConsumers);

module.exports = router
