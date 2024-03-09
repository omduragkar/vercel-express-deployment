const mongoose = require('mongoose')
const restaurant = require('../models/restaurant')
const category = require('../models/category')

mongoose.connect('mongodb://etoposdbmain:YEU9tpoAqDbhR25cd6y2V5pNqIgbtLK2Sqoxks9DS2LX8e43dgzDWT7v3nK13diO4UMzeEWNv4BQACDbpfgAKg%3D%3D@etoposdbmain.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@etoposdbmain@', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const placeCategories = async () => {
    console.log('Running script to add menu in all restaurants: ')
    console.log()
    let categories = await category.find({ restaurantId: "63fdf17d8922a1005513cf63"});
    console.log({categories});
    // const restroCat = await restaurant.findById("63fdf17d8922a1005513cf63");
    // let restroCatCo = [];
    // restroCatCo.push(restroCat.categories[restroCat.categories.length - 2]);
    // restroCatCo.push(restroCat.categories[restroCat.categories.length - 1]);
    // for (let i = 0; i < restroCat.categories.length - 2; i++) {
    //     restroCatCo.push(restroCat.categories[i]);
    // }
    // console.log({ restroCatCo })
    // let newPush = await restaurant.findByIdAndUpdate("63fdf17d8922a1005513cf63",
    //     {
    //         categories:restroCatCo
    //     }, {
    //     new: true
    // }).populate({
    //     path:"categories",
    // });
    // console.log({newPush})
    //     let ownerId = restaurants[i].createdBy ? restaurants[i].createdBy : restaurants[i].owner_id
    //     s
    //     if (ownerId) {
    //       let userFound = await user.findById(ownerId)
    //       if (userFound.role === 'VENDOR') {
    //         await restaurant.findOneAndUpdate(
    //           {
    //             _id: restaurants[i]._id
    //           },
    //           {
    //             mobileNumber: userFound.mobileNumber
    //           }
    //         )
    //       }
    //     }
    //   }
    // console.log(`Proccessed the Work Please Exit`, restroCat)
}

placeCategories()
