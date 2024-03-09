const express = require('express')
const router = express.Router()
const authorize = require('../middleware/check-auth').Authenticate
const loginUser = require('../controllers/userControllers/loginUser')
const createUser = require('../controllers/userControllers/createUser')
const protect = require('../middleware/authUsermiddleware')
const logOut = require('../controllers/userControllers/logOut')
const editUser=require('../controllers/userControllers/editUser')
const deleteUser = require('../controllers/userControllers/deleteUser')
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
 * 1. /createOwner :- This route is used to Owner By Admin
 * 2. /verifyOtp :- This route is used to verify otp for user
 * 3. /updateFCMToken :- This route is used to update fcm token for user
 * 4. /updateFCMTokenMobile :- This route is used to update fcm token for user on mobile
 * 5. /logout :- This route is used to logout user
 * 6. /updateRestOwnerMobileNo :- This route is used to update mobile number for restaurant owner
 * 7. /getUserByMobileNumber :- This route is used to get user by mobile number in Admin panel
 * 8. /getUserDetails :- This route is used to get user details
 * 9. /updateUserDetails :- This route is used to update user details
 * 10. /checkUserNameIfExists :- This route is used to check if username is available
 * 11. /changeUserRole :- This route is used to change user role
 * 12. /deleteUser :- This route is used to delete user
 * 13. /toggleIsFeedHidden :- This route is used to toggle isFeedHidden
 *
 */




router.post('/login', loginUser)
router.post('/createUser', protect, createUser)
router.post("/editUser",protect, editUser)
router.post('/deleteUser', protect, deleteUser);
router.post('/logOut', protect, logOut)

// router.post('/verifyOTP', userController.verifyOtp)
// router.put('/updateFCMToken', authorize, userController.updateFCMToken)
// router.put('/updateFCMTokenMobile', authorize, userController.updateFCMTokenMobile)
// router.post('/logOut', userController.logOut)
// router.post('/updateRestOwnerMobileNumber', authorize, userController.updateRestOwnerMobileNumber)
// router.get('/getUserByMobileNo', AuthenticateAdmin, userController.getUserByMobileNo)
// router.get('/getAllUsers', AuthenticateAdmin, userController.getAllUsers)
// router.get('/getUserDetails', authorize, userController.getUserDetails)
// router.put('/updateUserDetails', authorize, userController.updateUserDetails)
// router.put('/changeUserRole', AuthenticateAdmin, userController.changeUserRole)
// router.delete('/deleteUser', AuthenticateAdmin, userController.deleteUser)
// router.put('/toggleIsFeedHidden', authorize, userController.toggleIsFeedHidden)
// router.get('/getAllVendors', AuthenticateAdmin, userController.getAllVendors)
// router.get('/usersWithDetails', AuthenticateAdmin, userController.usersWithDetails)
// router.put('/updateUserFullName', authorize, userController.updateUserFullName)


module.exports = router
