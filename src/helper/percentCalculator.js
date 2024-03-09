module.exports.percentCalculator = (percent, orderValue)=>{
    const percentage = (percent / 100) * orderValue;
    return percentage;
}