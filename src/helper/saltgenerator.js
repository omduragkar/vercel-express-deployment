const bcrypt=  require("bcrypt");


module.exports.generateSalt = async (pin)=>{
    const salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(pin, salt);
    return password;
}


module.exports.matchPassword = async function(enteredPassword, saltPin){
    return await bcrypt.compare(enteredPassword, saltPin);
  
  }
  