# Uber Clone Backend

## Backend Server Setup

- Create a directory named `Backend` to store all the backend code and logic of this project
- Navigate to the `Backend` directory, and considering this directory a the root, run in terminal `npm init -y` to initialize a node project as a result a `package.json` will be created in this directory.
  ```bash
  cd Backend
  npm init -y
  ```
- After that set the main entry point to `sever.js` and add just two scripts for now - one is `'dev': 'node server.js'` to run the server in the production and the other one is `"server": "nodemon server.js"` to run the server locally in the development phase.
- Install the following important packages

  ```bash
  npm i express cors dotenv mongodb mongoose
  ```

  Here is how the `package.json` file look like after these basic changes

  ```json
  {
    "name": "backend",
    "version": "1.0.0",
    "main": "server.js",
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "description": "",
    "dependencies": {
      "cors": "^2.8.5",
      "dotenv": "^17.2.1",
      "express": "^5.1.0",
      "mongodb": "^6.18.0",
      "mongoose": "^8.17.0"
    }
  }
  ```

- Create a function named `connectToDb` in `./bd/db.j` file to make a connection to the DB using the `mongoose.connect(URI)` method provided by the `mongoose` package.

  ```jsx
  const mongoose = require("mongoose");

  const connectToDb = async () => {
    try {
      await mongoose.connect(process.env.URI);
      console.log("Connected to DB successfully");
    } catch (error) {
      console.log(error);
    }
  };

  module.exports = connectToDb;
  ```

- Create an `app.js` file in the root directory which is `Backend` . It is the `app.js` file in which an express instance named `app` will be initialized, all the application level middleware will be configured, connection to the DB will be established and finally all the possible routes will be defined

  ```jsx
  require("dotenv").config();
  const express = require("express");
  const cors = rquire("cors");
  const connectToDb = require("./bd/db.js");
  const controllers = require("./controllers/helloWorld.js");

  // step 1: Initialize an express app instance
  const app = express();

  // step 2: configure app level middleware
  app.use(cors());

  // step 3: connect to the DB
  connectToDb();

  // step: 4: defind routes
  app.get("/", controllers.helloWorld);

  // export the app instance
  module.exports = app;
  ```

- Create the `server.js` in the root whose purpose is to serve as the main entry point of this backend server. This file will be using to define or create and run a http server.

  ```jsx
  const http = require("http");
  const app = require("./app.js");
  const port = process.env.SERVER_PORT || 5000;

  // step 1: create a http server
  const server = http.createServer(app);

  // step 2: listen the server
  server.listen(port, () => {
    console.log(`Uber backend server is running on: http://localhost:${port}`);
  });
  ```

- Then open the terminal and make sure you are in the root directory `Backend` and then run the server using the following command
  ```bash
  npm run server
  ```
- If very goes right, this is what will be displayed in your terminal window after your run `npm run server` command in the terminal. Congratulation on your successful backend server setup for your Uber-Clone project
  ```bash
  [nodemon] restarting due to changes...
  [nodemon] starting `node server.js`
  [dotenv@17.2.1] injecting env (3) from .env -- tip: 📡 auto-backup env with Radar: https://dotenvx.com/radar
  Uber backend server is running on http://localhost:3000
  Connected to DB successfully!
  ```
