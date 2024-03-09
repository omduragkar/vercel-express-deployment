const Restaurant = require('../models/restaurant')
const mongoose = require('mongoose')
//! @OM
//! IMPORTANT: THIS FUNCTION IS BUGGY, findOne QUERY IS NOT WORKING AS EXPECTED
//! PLEASE FIX THIS QUERY AND HAVE ONLY 2 CHARACTERS IN UNIQUE_ID
const generateUniqueId = async restaurantName => {
  const restaurantNameArray = restaurantName.split(' ')
  const restaurantNameArrayLength = restaurantNameArray.length
  let restaurantNameString = ''
  if (restaurantNameArrayLength > 1) {
    restaurantNameString = restaurantNameArray[0][0] + restaurantNameArray[1][0]
  } else {
    restaurantNameString = restaurantNameArray[0][0] + restaurantNameArray[0][1]
  }
  const alreadyExists = await Restaurant.findOne({
    uniqueId: { $regex: restaurantNameString }
  })
  if (alreadyExists) {
    // TODO: Starting of a string to be matched
    const count = await Restaurant.countDocuments({
      uniqueId: restaurantNameString
    })
    return `${restaurantNameString}${count}`
  } else {
    return `${restaurantNameString}`
  }
}

// `New function Created for Change in UniqueId Please check once with normally running the file.`


const generateUniqueIdNew = async restaurantName =>{
  restaurantName.trimLeft();
  let findResults = restaurantName.charAt(0) 
  let searchResult = findResults + "[0-9]";
  const alreadyExists = await Restaurant.find(
    { "uniqueId": { "$regex": searchResult, "$options": "i" } 
  })
  console.log("🚀 ~ file: generateUniqueId.js ~ line 49 ~ alreadyExists", alreadyExists)
  if(alreadyExists != null && alreadyExists.length != 0){
    let lastId = alreadyExists[alreadyExists.length - 1].uniqueId;
    let newNumber = Number(lastId.substring(1)) + 1;
    findResults += newNumber;
    
  }else{
    findResults += "0";
  }
  console.log("🚀 ~ file: generateUniqueId.js ~ line 57 ~ findResults", findResults)
  
}

// To test Code run this file by uncommeting the below code.

// (async function (){
//   await mongoose.connect("mongodb+srv://Lazar786:Menucart786@cluster0.sny7p.mongodb.net/socon-production",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
// })()

// generateUniqueIdNew("Green Heritage 1");
//  OR
// generateUniqueIdNew("PeetPooja outlet 3");


module.exports = generateUniqueId

