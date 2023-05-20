const dotenv = require("dotenv");
var mongoose = require("mongoose");

 dotenv.config({path: "./src/.env"});

 const password = process.env.DB_PASSWORD;
 const username = process.env.DB_USERNAME;
 const cluster  = process.env.DB_CLUSTER;
 const code  = process.env.DB_CODE;
 const folder = process.env.DB_FOLDER;

const dbConnect = () => {
  const mongoURI= `mongodb+srv://${username}:${password}@${cluster}.${code}.mongodb.net/${folder}`;

   mongoose.connect(mongoURI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     // useFindAndModify: false,
     // useCreateIndex: true,
     connectTimeoutMS: 15000,
   });
   let db = mongoose.connection;
   db.on("error", console.log.bind(console, "connection error"));
   db.once("open", function () {
     console.log("MONGODB CONNECTED TO : "+folder);
  });
};

module.exports = dbConnect;