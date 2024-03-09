
const express = require('express')
const protect = require('../middleware/authUsermiddleware')
const showTablesByRestaurantId = require('../controllers/tablecontroller/showTablesByRestaurantId')
const { addTablesByRestaurantId } = require('../controllers/tablecontroller/addTable')
const { createFloor } = require('../controllers/restaurantControllers/createFloor')
const getRestaurantById = require('../controllers/restaurantControllers/getRestaurantById')
const getAllUsers = require('../controllers/userControllers/getAllUsersByRestaurantId')
const getMainDashboard = require('../controllers/dashboardControllers/getMainDashboard')
const getPrintData = require('../controllers/dashboardControllers/getPrintData')
const savePrintData = require('../controllers/dashboardControllers/savePrintData')
const createAndUpdateExpenses=require("../controllers/dashboardControllers/createAndUpdateExpenses")
const deleteExpenses=require("../controllers/dashboardControllers/deleteExpenses")
const createAndUpdateExpenseType=require("../controllers/dashboardControllers/createAndUpdateExpenseType")
const deleteExpenseType=require("../controllers/dashboardControllers/deleteExpenseType")
const getExpenseByRestaurantId=require("../controllers/dashboardControllers/getExpenseByRestaurantId")

const router = express.Router()

router.get('/getTable', protect, showTablesByRestaurantId)
router.post('/createTable', protect, addTablesByRestaurantId);
router.post('/createFloor', protect, createFloor);
router.get('/getRestaurant', protect, getRestaurantById)
router.get('/getAllUserByRestaurantId', protect, getAllUsers);
router.get('/getMainDashboard', protect, getMainDashboard);
router.get('/getPrintData', protect, getPrintData);
router.post('/savePrintData', protect, savePrintData);
router.post('/createAndUpdateExpense', protect, createAndUpdateExpenses);
router.post('/deleteExpense', protect, deleteExpenses);
router.post('/createAndUpdateExpenseType', protect, createAndUpdateExpenseType);
router.post('/deleteExpenseType', protect, deleteExpenseType);
router.get('/getExpenseByRestaurantId', protect, getExpenseByRestaurantId)
module.exports = router