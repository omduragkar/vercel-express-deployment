const express = require('express')
const router = express.Router()
const createOrder = require('../controllers/placeOrderControllers/createOrder')
const protect = require('../middleware/authUsermiddleware')
const getOrderById = require('../controllers/placeOrderControllers/getOrder')
const getCurrentOrder = require('../controllers/placeOrderControllers/getCurrentOrder')
const orderStatus = require('../controllers/placeOrderControllers/changeOrderStatus')
const updateOrder = require('../controllers/placeOrderControllers/updateOrder')
const getOrderHistoryForRestaurant = require('../controllers/placeOrderControllers/getOrderHistoryForRestaurant')
const cancelOrder = require('../controllers/placeOrderControllers/cancelOrder')
const getOrderReport = require('../controllers/placeOrderControllers/getOrderReport')
const { swapTable } = require('../controllers/tablecontroller/swapTable')
const applyDiscount = require('../controllers/placeOrderControllers/applyDiscount')
const getOrderDiscount = require('../controllers/placeOrderControllers/getOrderDiscount')
const topHistory=require("../controllers/placeOrderControllers/topHistory")
// const authorize = require('../middleware/check-auth').Authenticate
// const { AuthenticateAdmin } = require('../middleware/checkAdminAuth')

router.post('/createOrder', protect, createOrder)
router.get('/getOrder', protect, getOrderById);
router.get('/getCurrentOrder', protect, getCurrentOrder);
router.post('/changeOrderStatus', protect, orderStatus);
router.post('/completeOrder', protect, updateOrder);
router.post('/cancelOrder', protect, cancelOrder);
router.get('/getOrderHistory', protect, getOrderHistoryForRestaurant);
router.get('/getOrderReport', protect, getOrderReport);
router.get('/getOrderDiscount', protect, getOrderDiscount);
router.post('/transferTable', protect, swapTable);
router.post("/applyDiscount", protect, applyDiscount);
router.get("/topHistory", protect, topHistory);

// router.get('/getAllOrdersByRestaurantId', authorize, placeOrderController.getAllOrdersByRestaurantId)
// router.get('/paymentStatus', authorize, placeOrderController.paymentStatus)
// router.post('/updatePaymentStatus', authorize, placeOrderController.updatePaymentStatus)
// router.post('/pickupOrder', authorize, placeOrderController.pickupOrder)
// router.post('/adminPickupOrder', placeOrderController.adminPickupOrder)
// router.post('/verification', placeOrderController.verification)
// router.get('/getTransactionHistoryRestaurantId', authorize, placeOrderController.getTransactionHistoryRestaurantId)
// router.get('/isFirstOrder', authorize, placeOrderController.isFirstOrder)
// router.get('/getMyOrders', authorize, placeOrderController.getMyOrders)
// router.get('/getOrderHistoryForRestaurant', authorize, placeOrderController.getOrderHistoryForRestaurant)
// router.get('/getOrderHistoryByDate', authorize, placeOrderController.getOrderHistoryByDate)
// router.get('/getAllOrderGodMode', AuthenticateAdmin, placeOrderController.getAllOrderGodMode)
// router.get('/getFreeGiftsClaimedByUser', AuthenticateAdmin, placeOrderController.getFreeGiftsClaimedByUser)
// router.get('/getFreeGiftsGivenByRestaurant', AuthenticateAdmin, placeOrderController.getFreeGiftsGivenByRestaurant)
// router.get('/getAllFreeMealsDataGroupByUser', AuthenticateAdmin, placeOrderController.getAllFreeMealsDataGroupByUser)
// router.get('/countFreeMealsClaimedByUser', AuthenticateAdmin, placeOrderController.countFreeMealsClaimedByUser)
// router.get('/getAllFreeMealsData', AuthenticateAdmin, placeOrderController.getAllFreeMealsData)

module.exports = router