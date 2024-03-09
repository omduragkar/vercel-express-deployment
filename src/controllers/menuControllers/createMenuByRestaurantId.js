const response = require('../../utils/response')
const { ROLE } = require('../../constants/role')
const category = require('../../models/category')
const menu = require('../../models/menu')
const restaurant = require('../../models/restaurant')
const Variation = require('../../models/Variation')

const createMenuByRestaurant = async (req, res) => {
    const { role, _id, restaurantLinked } = req.userDetails
    let { categoryId, packingCharges, itemrank, ignoreTaxes, favorite, ignoreDiscounts, isEdit=false, menuId=null } = req.body;
    let { available, itemName, itemShortName, itemAttributeid, itemdescription="", minimumpreparationtime="", price, itemTax, variations, addons } = req.body;
    const restaurantId =String(restaurantLinked[0]);
  try {
        const dataIp = [ROLE.OWNER, ROLE.CAPTAIN].includes(role);
        if (dataIp) {
            let foundSameName  = await menu.findOne({
                restaurantId,
                $or: [
                  {
                    itemName
                  },
                  {
                    itemShortName
                  },
                  {
                    itemAttributeid
                  }
                ]

            })
            if(!foundSameName && restaurantId && itemTax && itemName && itemAttributeid && itemShortName){
              let variationIds= [];
              let addonIds = [];
              for(let i = 0; i< variations.length;i++){
                  let variationid = await Variation.create({
                    restaurantId,
                    variationName: variations[i].variationName,
                    variationAvaialable: variations[i].variationAvaialable,
                    variationOptions: variations[i].variationOptions
                  })
                  variationIds.push(variationid);
              }
              for(let i = 0; i< addons.length;i++){
                let variationid = await Variation.create({
                  restaurantId,
                  variationName: addons[i].variationName,
                  variationAvaialable: addons[i].variationAvaialable,
                  variationOptions: addons[i].variationOptions
                })
                addonIds.push(variationid);
              }
                let createMenu = await menu.create({
                  categoryId, packingCharges, itemrank, ignoreTaxes, favorite, ignoreDiscounts,restaurantId,
                  available, itemName, itemShortName, itemAttributeid, price, itemTax ,
                  variations:variationIds,
                  addons:addonIds
                })
                if (createMenu) {
                    let addMenutoCategory = await category.findOneAndUpdate({_id:categoryId}, {
                        $push:{menu:createMenu._id}
                    },{
                         new:true
                    }).populate("menu")
                    if(addMenutoCategory){
                        return response(res, 200, true, 'Category Created Successfully', {
                            categoryResult: addMenutoCategory,
                            menu:createMenu
                        })

                    }else{
                        return response(res, 500, false, 'Unable to create Category', null)

                    }
                } else {
                    return response(res, 500, false, 'Category Not Created. Please Contact Admin', null)
                }
                
            
            } else if(foundSameName && isEdit){
              let variationIds= [];
              let addonIds = [];
              for(let i = 0; i< variations.length;i++){
                let variationid = null;
                if(variations[i]._id){
                  variationid = await Variation.findByIdAndUpdate(variations[i]._id, {
                    variationName: variations[i].variationName,
                    variationAvaialable: variations[i].variationAvaialable,
                    variationOptions: variations[i].variationOptions
                  })
                }else{
                  variationid = await Variation.create({
                    restaurantId,
                    variationName: variations[i].variationName,
                    variationAvaialable: variations[i].variationAvaialable,
                    variationOptions: variations[i].variationOptions
                  })
                }
                  variationIds.push(variationid);
              }
              for(let i = 0; i< addons.length;i++){
                let variationid = null;
                if(addons[i]._id){
                  variationid = await Variation.findByIdAndUpdate(addons[i]._id, {
                    variationName: addons[i].variationName,
                    variationAvaialable: addons[i].variationAvaialable,
                    variationOptions: addons[i].variationOptions
                  })
                }else{
                  variationid = await Variation.create({
                    restaurantId,
                    variationName: addons[i].variationName,
                    variationAvaialable: addons[i].variationAvaialable,
                    variationOptions: addons[i].variationOptions
                  })
                }
                addonIds.push(variationid);
              }
              let updateMenu = await menu.findByIdAndUpdate(
                menuId
                ,{
                available, 
                itemName, 
                itemShortName, 
                itemAttributeid, 
                itemdescription, 
                minimumpreparationtime, 
                price, 
                itemTax,
                categoryId, 
                packingCharges, 
                itemrank, 
                ignoreTaxes, 
                favorite, 
                ignoreDiscounts,
                variations:variationIds,
                addons:addonIds
              }, {
                new:true
              }).populate("variations addons")
              if(updateMenu){
                let addMenutoCategory = await category.findOne({_id:categoryId}).populate({
                  path: 'menu',
                  populate: {
                    path: 'variations',
                  }
                })
              if(addMenutoCategory){
                  return response(res, 200, true, 'Category Created Successfully', {
                    categoryResult: addMenutoCategory,
                    menu:updateMenu
                  })

              }else{
                return response(res, 500, false, 'Unable to create Category', null)

              }
              }else{
                return response(res, 400, false, 'No proper Fields Added!', {
                  itemName:itemName == foundSameName.itemName ? true:false,
                  itemShortName:itemShortName == foundSameName.itemShortName ? true:false,
                  itemAttributeid:itemAttributeid == foundSameName.itemAttributeid ? true:false,
                })

              }
            }
            else{
                if(foundSameName){
                  let val = "";
                  if(itemName == foundSameName.itemName){
                    val="item Name"
                  }else if(itemShortName == foundSameName.itemShortName){
                    val="item Short Name";
                  }else{                
                    val="item Attribute id";
                  }
                    return response(res, 400, false, 'Same Name Already Exists!', {
                      itemName:itemName == foundSameName.itemName ? true:false,
                      itemShortName:itemShortName == foundSameName.itemShortName ? true:false,
                      itemAttributeid:itemAttributeid == foundSameName.itemAttributeid ? true:false,
                    })

                }else{

                    return response(res, 400, false, 'Mandatory Fields Missing', {
                      restaurantId:restaurantId?true:false,
                      itemTax:itemTax?true:false,
                      itemName:itemName?true:false,
                      ignoreTaxes:ignoreTaxes?true:false,
                    })
                }
            }
            
        } else {
        return response(res, 402, false, 'Not Authorized to create Category', null)
        }
  } catch (err) {
    console.log('🚀 ~ file: createMenuByRestaurant.js ~ line 125 ~ createMenuByRestaurant ~ err', err)
    return response(res, 500, false, 'Internal Server Error', { err: err.message })
  }
}

module.exports = createMenuByRestaurant
