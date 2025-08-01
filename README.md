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

## Server Specific API Endpoint Implementation

- Define the server specific routes in the `app.js` file using the `app.use(path, routesReferances)` method. Here the `routesReferances` will be defined in `./routes/serverRoutes.js` file and then all the routes defined there will be exposed to external files so that those routes references can be used from the other external files like `app.js` file. Here is how the `./app.js` file looks like at this point.

  ```jsx
  require("dotenv").config();
  const express = require("express");
  const cors = rquire("cors");
  const connectToDb = require("./bd/db.js");
  const serverRoutes = require("./routes/serverRouter.js");

  // step 1: Initialize an express app instance
  const app = express();

  // step 2: configure app level middleware
  app.use(cors());

  // step 3: connect to the DB
  connectToDb();

  // step: 4: defind routes
  app.get("/", serverRoutes); // this will execute all the server specific routes

  // export the app instance
  module.exports = app;
  ```

- Create a routes directory named`routes` in the root and within the `./routes` create a file named `serverRouter.js` in which all the server specific API endpoints will be defined and then finally will be exposed to the other external files by exporting them all. Here is how the `./routes/sererRouter.js` file looks like at this point.
  ```jsx
  const express = require("express");
  const serverRouter = express.Router();
  const serverController = require("../controllers/serverController.js");

  // step 1: define all the server specific API
  serverRouter.get("/", serverController.greetPeople);

  // step 2: export the serverRouter
  module.exports = serverRouter;
  ```
  Here the `greetPople` is a controller defined in the `./controllers/serverController.js` file which will be created in the next step. The `serverController.js` will be holding all the required controller function definitions that are specific to the server only.
- Create a directory name `controllers` in the root and inside of this `./controllers` directory create the `serverController.js` file which will actually expose all the controller definitions specific to the server only. Here is how the `./controllers/serverController.js` file looks like at this moment.
  ```jsx
  // @name: helloWorld
  // @path: GET /
  // @desc: display the 'hello world' message
  const helloWorld = (req, res, next) => {
    res.send("Hello World!");
  };

  // @name: greetPeople
  // @path: GET /
  // @desc: welcome people to the Uber-clone-backend-server
  const greetPeople = (req, res, next) => {
    res.send("Welcome to the Uber's backend server (cloned)");
  };

  // exports the server controllers
  module.exports = { helloWorld, greetPeople };
  ```
- From now on, for any new server specific API implementation, we just need to perform the following steps
  - Define a controller function for the respective API endpoint in the `./controllers/serverController.js` file and then export that controller function so that other files can use that later, if needed.
  - Import the the server controllers in the `./routes/serverRouters.js` file and create the API endpoint there using the corresponding server specific controller defined in the `./controllers/serverController.js` file earlier.
