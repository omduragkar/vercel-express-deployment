// const dashboardControllers = require('../controllers/dashboard')
const express = require('express')
const router = express.Router()
const { AuthenticateAdmin } = require('../middleware/checkAdminAuth')
const createRestaurantDashboard = require('../controllers/dashboardControllers/createRestaurantDashboard');
// const rechargeRestaurantTrial = require('../controllers/restaurantControllers/rechargeRestaurantTrial');

const rechargeRestaurantTrial = require('../controllers/restaurantControllers/rechargeRestaurantTrial');
const createOwner = require('../controllers/userControllers/createOwner');
const { addAdmin } = require('../controllers/dashboardControllers/createAdmin');


/**
 * @description
 * The first parameter is the route path
 * The second parameter is the middleware function
 * The third parameter is the controller function
 *
 * authorize is the middleware function to verify the user is authenticated
 * AuthenticateAdmin is the middleware function to verify the user is an admin
 *
 * This has multiple routes linked to different controllers
 * 1. /createOwner :- This route is used to create Owner By Admin
 * 2. /createRestaurant :- This route is used to create Restaurant By Admin
 * 3. /rechargeRestaurantTrial :- This route is used to update recharge Trial offer for Restaurant

 */

router.post("/createOwner", AuthenticateAdmin, createOwner); //AuthenticateAdmin makes Admin only users to Fulfill create Owner Request

router.post('/createRestaurant',AuthenticateAdmin, createRestaurantDashboard)

router.post('/rechargeRestaurantTrial', AuthenticateAdmin, rechargeRestaurantTrial)
router.post('/createAdmin', AuthenticateAdmin, addAdmin);
module.exports = router
