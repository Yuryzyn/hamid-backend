const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./src/routers/index");
const helmet = require("helmet");

const app = express();
const server = require("http").Server(app);

dotenv.config({path: "./src/.env"});
const PORT = process.env.PORT;

require("./db.connect")();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: "PHP 7.4.11" }));

app.use("/", router);

app.use(require("./src/middlewares/error"));

server.listen(PORT, () => {
  console.log("PORT : "+PORT);
});