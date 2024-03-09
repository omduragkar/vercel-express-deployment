const express = require('express')
const router = express.Router()
const createCategories = require('../controllers/menuControllers/createCategories')
const protect = require('../middleware/authUsermiddleware')
const createMenuByRestaurant = require('../controllers/menuControllers/createMenuByRestaurantId')
const { getCategoryMenuByRestaurant, getAllMenuByRestaurantId } = require('../controllers/menuControllers/getAllMenuByRestaurantId')
const deleteMenuById = require('../controllers/menuControllers/deleteMenuById')
// // const multer = require('multer')
// const { AuthenticateAdmin } = require('../middleware/checkAdminAuth')

// // const storage = multer.diskStorage({
// //   destination: '/uploads/menuItemImages/MyImage', // !Change to /uploads when deploying to staging or production
// //   filename: function (req, file, cb) {
// //     const ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1)
// //     const name = file.originalname.substr(0, file.originalname.lastIndexOf('.'))
// //     file.originalname = name.replace(/\W+/g, '_') + '.' + ext
// //     cb(null, Date.now() + '_' + file.originalname)
// //   }
// // })

// // const fileFilter = (req, file, cb) => {
// //   console.log('Log: ~> file: menu.js ~> line 25 ~> fileFilter ~> file', file)

// //   cb(null, file?.mimetype === 'image/jpeg' || file?.mimetype === 'image/png')
// // }

// // const upload = multer({
// //   storage: storage,
// //   limits: {
// //     fileSize: 1024 * 1024 * 5
// //   },
// //   fileFilter: fileFilter
// // })

router.post('/createMenuByRestaurantId', protect, createMenuByRestaurant);
router.post('/deleteMenuByRestaurantId', protect, deleteMenuById);
router.post('/createCategoryByRestaurantId', protect, createCategories);
router.get('/getAllMenuByRestaurantId', getAllMenuByRestaurantId)
router.get('/getCategoryByRestaurantId', getCategoryMenuByRestaurant)
// router.post('/uploadMenuItemImage', authorize, menuController.uploadMenuItemImage)
// // router.get("/getMenuById/:menuId",authorize, menuController.getMenuById);
// router.put('/updateMenuById', authorize, menuController.updateMenuById)
// router.delete('/deleteMenuById', authorize, menuController.deleteMenuById)
// router.put('/addAnotherMenuAsGift', authorize, menuController.addAnotherMenuAsGift)
// router.delete('/removeOffersFromLoyaltyCard', authorize, menuController.removeOffersFromLoyaltyCard)
// router.post('/removeAOffer', AuthenticateAdmin, menuController.removeAOffer)
// router.post('/addAnOffer', AuthenticateAdmin, menuController.addAnOffer)

module.exports = router
