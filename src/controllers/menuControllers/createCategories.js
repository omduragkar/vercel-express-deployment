const response = require('../../utils/response')
const { ROLE } = require('../../constants/role')
const category = require('../../models/category')
const restaurant = require('../../models/restaurant')

const createCategories = async (req, res) => {
    const { role, _id, restaurantLinked } = req.userDetails
    let { categoryName, isAvailable, edit= false, categoryId=null } = req.body;
    const restaurantId =String(restaurantLinked[0]);
  try {
        const dataIp = [ROLE.OWNER, ROLE.CAPTAIN].includes(role);
        if (dataIp) {
            let foundSameName  = await category.findOne({
                $and:[{
                    restaurantId,
                },
                {
                    categoryName

                }]
            })
            if(!foundSameName && edit && categoryId){
                let foundSameName  = await category.findByIdAndUpdate(categoryId, 
                {
                    categoryName
                },{
                    new:true
                }).populate("menu");
                return response(res, 200, true, 'Updated!', {
                    categoryResult: foundSameName,
                    edit:edit
                })

            }else if(!foundSameName && restaurantId && categoryName && isAvailable){
                
                let createCategory = await category.create({
                    restaurantId,
                    isAvailable,
                    categoryName,
                    createdBy:_id
                })
                if (createCategory) {
                    let addCategoryToRestaurant = await restaurant.findOneAndUpdate({_id:restaurantId}, {
                        $push:{categories:createCategory._id}
                    },{

                        new:true
                    })
                    if(addCategoryToRestaurant){
                        return response(res, 200, true, 'Category Created Successfully', {
                            categoryResult: createCategory,
                            edit:edit

                        })

                    }else{
                        return response(res, 500, false, 'Unable to create Category', null)

                    }
                } else {
                    return response(res, 500, false, 'Category Not Created. Please Contact Admin', null)
                }
                
            
            } else {
                if(foundSameName){
                    return response(res, 400, false, 'Same Name Already Exists!', null)

                }else{

                    return response(res, 400, false, 'Mandatory Fields Missing', null)
                }
            }
            
        } else {
        return response(res, 402, false, 'Not Authorized to create Category', null)
        }
  } catch (err) {
    console.log('🚀 ~ file: createCategories.js ~ line 125 ~ createCategories ~ err', err)
    return response(res, 500, false, 'Internal Server Error', { err: err.message })
  }
}

module.exports = createCategories
