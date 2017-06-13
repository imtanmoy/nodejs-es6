"use strict";

import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import { port } from "./config/config";

const app = express();
require("./config/database");
const middlewaresConfig = require("./config/middlewares");
const routes = require("./app/routes/index");




// middlewares
middlewaresConfig(app);

// route
routes(app);

// Set Public Folder
app.use(express.static(path.join(__dirname, "../public")));

//error handling
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

app.listen(port, err => {
    if (err) {
        throw err;
    } else {
        console.log(`
      Server running on port: ${port}
      ---
      Running on ${process.env.NODE_ENV}
    `);
    }
});