const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/socon-production', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: { type: String, required: true }, //ask for phone no and email and createdBy the vendor id should b saved; so that he can only edit and update; same for menus too
    address: { type: String, required: true },
    coins: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    offers: [
      {
        giftItem: { type: String },
        coins: { type: Number },
        isAvailable: { type: Boolean, default: true },
        categoryId: {
          type: mongoose.Schema.ObjectId,
          ref: 'Category',
          required: true
        },
        menuId: { type: mongoose.Schema.ObjectId, ref: 'Menu', required: true }
      }
    ],
    themeColor: { type: String, default: '#FF2E2E' },
    openingTime: { type: String, default: '9 am' },
    closingTime: { type: String, default: '9 pm' },
    discount: { type: String, default: '0.0' },
    restaurantTokenImage: { type: String },
    restaurantLogoImage: { type: String },
    isRestaurantActive: { type: Boolean, default: true },
    isGstRegistered: { type: Boolean, required: true },
    packagingCharges: {
      small: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      large: { type: Number, default: 0 }
    },
    menu: [
      {
        menuItem: { type: String, required: true, default: '' },
        price: { type: Number, required: true, default: '' },
        menuItemImageName: { type: String, default: '' },
        menuItemImage: { type: String, default: '' },
        isGift: { type: Boolean, default: false },
        coins: { type: Number, required: true },
        isAvailable: { type: Boolean, required: true, default: false },
        excludeMe: { type: Boolean, default: true }
      }
    ]
  },
  { timestamps: true }
)

const menuSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Restaurant',
      required: true
    }, // Reference to the associated restaurant.
    menuItem: { type: String, required: true, default: '' },
    price: { type: Number, required: true, default: '' },
    menuItemImageName: { type: String, default: '' },
    menuItemImage: { type: String, default: '' },
    isGift: { type: Boolean, default: false },
    coins: { type: Number, required: true },
    isAvailable: { type: Boolean, required: true, default: false },
    excludeMe: { type: Boolean, default: true }
  },
  { timestamps: true }
)

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
const Menu = mongoose.model('Menu', menuSchema)

// Script to migrate menu from menu collection to Restaurant collection

const runScript = async () => {
  const allRestaurants = await Restaurant.find({}).select('_id')
  allRestaurants.forEach(async restaurant => {
    const menus = await Menu.find({ restaurantId: restaurant._id }).select(
      '_id menuItem price menuItemImageName menuItemImage isGift coins isAvailable excludeMe'
    )
    if (menus.length > 0) {
      await Restaurant.findByIdAndUpdate(restaurant._id, {
        $set: {
          menu: menus
        }
      })
    }
  })
}

runScript()
