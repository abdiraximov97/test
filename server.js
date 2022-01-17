require("dotenv").config();

const express = require("express");
const pg = require("./src/Modules/pg/pg");
const { ErrorHandlerMiddleware } = require("./src/Helpers/CustomError");
const {
  customErrorMiddleware,
} = require("./src/Middlewares/CustomErrorMiddleware");
const Routes = require("./src/Routes/index");
const cors = require("cors");

const app = express();
const port = process.env.port || 7070;

async function server() {
  try {
    const db = await pg();
    app.listen(port, () => {
      console.log(`SERVER READY AT ${port}`);
    });

    app.use(cors());
    app.use(express.json());

    app.use(async (req, res, next) => {
      req.db = await db;
      next();
    });

    app.use(
      express.urlencoded({
        extended: true,
      })
    );

    app.use(customErrorMiddleware);
    app.use("/v1", Routes);
    app.use(ErrorHandlerMiddleware);
  } catch (error) {
    console.log(`Server Error: ${error.message}`);
  }
}

server();
