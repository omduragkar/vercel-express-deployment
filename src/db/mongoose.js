const mongoose=require("mongoose");

// mongoose.connect("mongodb://localhost:27017/kupos",{
//   useNewUrlParser:true,
//   useUnifiedTopology:true
// }).then(()=>{
//   console.log("Connection successful");
// }).catch((err)=>{
//   console.log("connection failed");
// })


const connectDB = async (link) => {
  console.log('Log: ~> file: mongoose.js ~> line 30 ~> connectDB ~> connectDB')

  const db_url = link ??`mongodb://localhost:27017/etoPOS` //! local mongo db
  console.log(db_url);
  // const MONGO_STAGING_DB_URL = process.env.MONGO_SOCON_STAGING_URL //! global mongo test db
  // const MONGO_PRODUCTION_DB_URL = process.env.MONGO_SOCON_PRODUCTION_URL //! global mongo production db
  // const MONGO_SOCON_DEV_DB_URL = process.env.MONGO_SOCON_DEV_URL //! local mongo db

  // TODO: If user is not active, send notification to user with coin credited to his wallet

  // var isWin = process.platform === 'win32'

  // const db_url = isStaging || isDev || isWin ? MONGO_STAGING_DB_URL : MONGO_PRODUCTION_DB_URL
  try {
    const connectionDB = await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    if (connectionDB) {
      console.log(
        `🚀 ~ file: mongoose.js ~ line 25 ~ connectDB ~ connectionDBConnected to MongoDB ${connectionDB.connection.host}`
      )
    } else {
      console.log('🚀 ~ file: mongoose.js ~ line 31 ~ connectDB ~ connectionDB', connectionDB)
    }
  } catch (err) {
    console.log('🚀 ~ file: mongoose.js ~ line 19 ~ connectDB ~ err', err)
  }
}
module.exports = {
  connectDB
}

