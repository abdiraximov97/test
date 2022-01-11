require("dotenv").config();
const express = require("express");
const { func } = require("joi");

const app = express();

const port = process.env.port || 7070;

async function server() {
    
    app.listen(port, () => {
        console.log(`SERVER READY AT ${port}`);
    });
    app.use(express.urlencoded({
        extended: true,
    }));    
    app.use(express.json());
    
    
}