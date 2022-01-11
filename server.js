require("dotenv").config();
const express = require("express");
const pg = require("./src/Modules/pg/pg");
const { ErrorHandlerMiddleware } = require("./src/Helpers/CustomError");

const app = express();

const port = process.env.port || 7070;

async function server() {
  try {
    const db = await pg();
    app.listen(port, () => {
      console.log(`SERVER READY AT ${port}`);
    });
    app.use(
      express.urlencoded({
        extended: true,
      })
    );

    app.use(cors());
    app.use(express.json());

    app.use(async (req, res, next) => {
      req.db = db;
      next();
    });

    // app.use(CustomErrorMiddleware);
    // app.use("./v1", Routes);
    app.use(errorHandlerMiddleware);
  } catch (error) {
      console.log(`Server Error: ${error.message}`);
  }
}
