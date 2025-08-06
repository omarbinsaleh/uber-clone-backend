# Uber Clone Backend

## Backend Server Setup

- Create a directory named `Backend` to store all the backend code and logic for this project
- Navigate to the `Backend` directory, and considering this directory as the root, run `npm init -y` in terminal to initialize a node project as a result a `package.json` file will be created in the root directory.
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

## User Specific API Endpoints Implementation

- Create a directory named `models` in the root and in that `./models` directory create a file and name it `userModel.js`
- **Creating a Schema for User Model:**
  \*\*\*\*Create a user schema in the `./models/userModel.js` file using `new mongoose.Schema()` constructor provided by the `mongoose` package and name it as `userSchema` . This `userSchema` will be used to create the user model.
- **Add custom methods**
  There are two ways in mongoose to add custom methods to a Mongoose Model.
  - `schema.methods` : it is a way in Mongoose to add custom Instance-Level functions to a Model. These functions add behavior to individual document and can be accessible on each documents or instances of the Model. In our case, two such methods will be added -
    1. `userSchema.methods.generateAuthToken` : the purpose of this function is the generate a token using `jwt.sing(payload, secret)` method provided by the `jsonwebtoken` package. Here the `payload` contains user ID.
    2. `userSchema.methods.comparePassword` : the purpose of this function is to compare a password provided with the old password using the `bcrypt.compare(data, encrypted)` and return `Boolean`.
  - `schema.static` : it is a way in Mongoose to add Model-Level custom function to a Model. In our case, such one method will be added -
    1. `userSchema.statics.hashPassword` : the purpose of this function is to hash a password using the `bcrypt.hashPassword(password, saltingRound)` provided by the `bcrypt` package and return the hashed password.
- **Creating the User Model:**
  Using the `userSchema` , create a user model named `userModel` with the help of the `mongoose.model(modelName, schema, collectionName)` . The followings are the explanation of each of the three arguments that the `mongoose.model(modelName, schema, collectionName)` method usually takes

  - **`modelName`** (required) : a String being used internally by the Mongoose to specify the name of the Model. Mongoose uses the `modelName` and auto-pluralizes it to create the collection name, unless the collection name are not specified manually by passing the third argument which is `collectionName`
  - `schema` (required): specify the structure of the model being created.
  - `collectionName` (optional): a String which is used to specify the collection name.
    Here is how the `./models/userModel.js` file looks like at this point:

  ```jsx
  const mongoose = require("mongoose");
  const jwt = require("jsonwebtoken");
  const bcrypt = require("bcrypt");

  // define user schema
  const userSchema = new mongoose.Schema({
    fullName: {
      firstName: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
      },
      lastName: {
        type: String,
        minlength: [3, "Last name must be at least 3 characters long"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Email must be at least 5 characters long"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId: {
      type: String,
    },
  });

  // add custom methods to the userSchema
  userSchema.methods.generateAuthToken = () => {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
  };

  userSchema.methods.comparePassword = async (password) => {
    return await bcrypt.compare(password, this.password);
  };

  userSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
  };

  // create user model
  const userModel = mongoose.model("User", userSchema);

  // export the user model
  module.exports = userModel;
  ```

- Configure the user specific routes in the `./app.js` file.

  ```jsx
  require("dotenv").config();
  const express = reuire("express");
  const cors = require("cors");
  const connectToDb = require("./db/bd.js");
  const serverRoutes = require("./routes/serverRouter.js");
  const userRoutes = require("./routes/userRouter.js");

  // step 1: initialize the express app
  const app = express();

  // step 2: application level middlewares configuration
  app.use(cors());

  // step 3: connect to the database
  connectToDb();

  // step 4: routes configuration
  app.get("/", serverRoutes); // server specific routes
  app.use("/user", userRoutes); // user specific routes

  // step 5: export the app instance
  module.exports = app;
  ```

- Create a file named `userRouter.js` in the `./routes/` directory and define all API end point specific to user in that `./routes/userRouter.js` file and at the end make them exposed to other files.

  ```jsx
  const express = require("express");
  const userRouter = express.Router();
  const userController = require("./controllers/userController.js");

  // define user specific API end point
  userRouter.post("/register", userController.registerUser);
  userRouter.get("/", userController.getAllUsers);
  userRouter.get("/profile", userController.getUserProfile);

  // export user router
  module.exports = userRouter;
  ```

- Create a fine named `userController.js` in the `./controllers/` directory.
- Define all the user specific controllers in the `./controllers/userController.js` file and export them all at the end from this file.

### `registerUser` Controller Implementation

`registerUser` is a controller function whos purpose is to create a new user. The following is how this controller is implemented step by step:

- Create a directory in the root and name it as `services` . Then create a file in the `./services` directory and name that file `userServices.js` .
- Create a service named `createUser` in the `./services/userServices.js` file whose purpose is to create a new user in the MongoDB database only and return the new user.

  ```jsx
  const userModel = require("../models/userModel.js");

  // @name: createUser
  // @desc: create a new user in the MongoDB database
  const createUser = async ({ firstName, lastName, email, password }) => {
    if (!firstName || !lastName || !email || !password) {
      throw new Error("All fields are required");
    }

    const user = await userModel.create({
      fullName: { firstName, lastName },
      email,
      password,
    });

    return user;
  };

  module.exports = { createUser };
  ```

- Extract data (`fullName`, `email`, `password`) from the request body `req.body`
- Perform an error validation to check to see -
  - if the `email` is a valid email or not?
  - if the `firstName` is at least 3 character long or not?
  - if the `password` is at least 6 character long or not?
- If something goes wrong in the error validation, terminate the request-response cycle and send a response to the client with the status code 400 and the errors
- Hash the password extracted from the `req.body`
- Create a new user using the `createUser()` method defined in the `./services/userService.js` file
- Generate a token for authentication
- Send the `token` and the `user` to client with the status code 201
- If anything goes wrong or error happens in the process, then catch and handle the error and send response to the client with proper status code and message.
  Here is how the `./controllers/userController.js` file looks like at this point:

  ```jsx
  const { validationResult } = require("express-validator");
  const userModel = require("../models/userModels.js");
  const userServices = require("../services/userService.js");

  // @name: registerUser
  // @path: POST /user/register
  // @desc: Create a new user
  const registerUser = async (req, res, next) => {
    try {
      // step 1: extract data from the request body
      const { fullName, email, password } = req.body;

      // step 2: handle firstName, email and password validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // step 3: hash the password
      const hashedPassword = await userModel.hashedPassword(password);

      // step 4: create a new user
      const user = await userServices.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
      });

      // step 5: generate token
      const token = user.generateAuthToken();

      // step 6: send a success response to the client
      res.status(201).json({ token, user });
    } catch (error) {
      res.status(500).json({ error, message: error.message });
    }
  };

  // export the user controllers
  module.exports = { registerUser };
  ```

### `loginUser` Controller Implementation

`loginUser` is a controller function which handles all the process of login an existing user in the system. The followings are the implementation of this controller

- Define a middleware function named `loginUser` within the `./controllers/userController.js` file.
- In the function body, Extract data - i.e. { `email`, `password` } - from the `req.body`
- Perform an error-validation check for the `email` and `password` and send those errors to the front end, if anything found. The validation is supposed to check the following
  - if the `email` provided is a valid email or not?
  - The length of the `password` to make sure that the password is at least 6 characters long or more
- Check if the user with the same `email` exist in the Database. Use `userModel.findOne(queryObj)` method to find the user in the database. This method will return the user, if the user with the same email is found.
- In case by any chance if the user is not found, then terminate the request- response cycle and send an error message ‘Invalid email or password’ with the status code of 401.
- Compare both passwords and check if the `password` is matching with that in the database which `user.password` .
- In case by any chance if both the passwords do not match with each other, then terminate the request- response cycle and send an error message ‘Invalid email or password’ with the status code of 401.
- Generate a token for authentication
- Then send user information and the token to the front end with the status code 200 and a success message.
  Here is how the `./controllers/userController.js` file looks like at this point

  ```jsx
  // dependencies
  const { validationResult } = require("express-validator");
  const userModel = require("../models/userModels.js");
  const userServices = require("../services/userService.js");

  // @name: registerUser
  // @path: POST /user/register
  // @desc: Create a new user
  const registerUser = async (req, res, next) => {
    try {
      // step 1: extract data from the request body
      const { fullName, email, password } = req.body;

      // step 2: handle firstName, email and password validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // step 3: hash the password
      const hashedPassword = await userModel.hashedPassword(password);

      // step 4: create a new user
      const user = await userServices.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
      });

      // step 5: generate token
      const token = user.generateAuthToken();

      // step 6: send a success response to the client
      res.status(201).json({ token, user });
    } catch (error) {
      res.status(500).json({ error, message: error.message });
    }
  };

  // @name: loginUser
  // @path: POST /user/login
  // @desc: login user into the system
  const loginUser = async (req, res, next) => {
    // step 1: extract data from the request body
    const { email, password } = req.body;

    // step 2: email and password error validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // step 3: find user in the database with the email
    const user = await userModel.findOne({ email }).select("+password");

    // step 4: check if the user already exists
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
    }

    // step 5: check if the password is matching
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
    }

    // step 6: generate the authentication token
    const token = await user.generateToken();

    // step 7: send the user and the token to the font end
    res
      .status(200)
      .json({ user, token, message: "User loggedin successfully" });
  };

  // export the user controllers
  module.exports = { registerUser, loginUser };
  ```

### `getUserProfile` Controller Implementation

This controller function will control and handle all the functionality that are associated with returning a logged-in user profile information. The followings is how the controller is implemented step by step:

- Extract user data - i.e. `user` from the request object.
- send the `user` to the front end with status code 200 and a success message

NOTE: it is important to note that this `getUserProfile` controller is executed after the execution of a middleware named `authUser` which basically authenticates the user using token verification and add the user information in the `request` object, if it can authenticate the user successfully.

Here is how the `getUserProfile` controller looks like in the `./controllers/userController.js` file

```jsx
const { validationResult } = require("express-validator");
const userModel = require("../models/userModels.js");
const userServices = require("../services/userService.js");

// @name: registerUser
// @path: POST /user/register
// @desc: Create a new user
// @auth: Omar Bin Saleh
const registerUser = async (req, res, next) => {
  try {
    // step 1: extract data from the request body
    const { fullName, email, password } = req.body;

    // step 2: handle firstName, email and password validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // step 3: hash the password
    const hashedPassword = await userModel.hashedPassword(password);

    // step 4: create a new user
    const user = await userServices.createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
    });

    // step 5: generate token
    const token = user.generateAuthToken();

    // step 6: send a success response to the client
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error, message: error.message });
  }
};

// @name: findUsers
// @path: GET /user
// @desc: retrive all the users from the DB;
// @auth: Omar Bin Saleh
const findUsers = async (req, res, next) => {
  try {
    res.send({ user: "all users has been returned successfully" });
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @name: loginUser
// @path: POST /user/login
// @desc: allow an existing user to login
// @auth: Omar Bin Saleh
const loginUser = async (req, res, next) => {
  // step 1: extract data from the request body
  const { email, password } = req.body;

  // step 2: email and password error validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // step 3: find user in the database with the email
  const user = await userModel.findOne({ email }).select("+password");

  // step 4: check if the user already exists or not
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // step 5: check if the password is matching
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // step 6: generate the authentication token
  const token = await user.generateToken();

  // step 7: send the user and the token to the font end
  res.status(200).json({ user, token, message: "User loggedin successfully" });
};

// @name: getUserProfile
// @path: GET /user/profile
// @midd: authUser > getUserProfile
// @desc: return profile information of a logged-in user
// @auth: Omar Bin Saleh
const getUserProfile = async (req, res, next) => {
  res.status(200).json({ user: req.user, message: "User profile is returned" });
};

// exports user's controllers
module.exports = { registerUser, findUsers, loginUser, getUserProfile };
```

### `authUser` Middleware Implementation

`authUser` is a middleware function defined in the `./middleware/uathMiddleware.js` file. The middleware basically authenticates a user using token verification and add the user information in the `request` object, if it can authenticate the user successfully. The implementation of the middleware is as follows:

- Extract the `token` from the `req.cookies` or `req.headers.authorization` .
- Check if the `token` is found or not. If not, then terminate the request-response cycle and send an error message saying ‘Unauthorized access’ to the front end with status code 401.
- Decode the token using `jwt.verify(token, secret)` method which ultimately return a decoded object containing the user ID ( i.e. `_id` ) within it
- Now find the user from the database using the user ID found in the decoded object.
- Add the user information in the `request` object with a key `user` so that the other middleware or controller function that gets execute after this middleware can access the user information by `req.user` .
  Here is how the `./middleware/authMiddleware.js` file looks like at this point:

  ```jsx
  const userModel = require("../models/userModel.js");
  const jwt = require("jsonwebtoken");

  // @name: authUser
  // @desc: Authenticate a user by using the token validation
  // @auth: Omar Bin Saleh
  const authUser = async (req, res, next) => {
    // step 1: check if the token is found or not
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    try {
      // step 2: decode the token
      const decodedObj = jwt.verify(token, process.env.JWT_SECRET);

      // step 3: check if the user is found or not
      const user = await userModel.findOne({ _id: decodedObj._id });
      if (!user) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      // step 4: add the user information in the request object
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
  };

  // exports all auth middleware
  module.exports = { authUser };
  ```

### Mongoose Schema

Just to mention few more information about the `mongoose.Schema()` constructor. In `mongoose` , this `mongoose.Schema()` is used to define the structure of documents within a MongoDB collection. It takes two arguments - 1. Schema Definition Object (Required) and 2. Schema Options Object (Optional)

- **Schema Definition Object (required):**
  It is an object that defines the fields (keys) and their data types, validation rules and default value, etc.
  **Schema Field Options (Key-Value Pairs):**
  Each field in your schema can be defined like
  ```jsx
  fieldName:{
  	type: String,
  	required: true,
  	default:'value',
  	unique: true,
  	enum: ['Option1', 'Option2'],
  	min: 0,
  	max: 100,
  	minlength: 5,
  	maxlength: 225,
  	match: /regex/,
  	validation: function(val) {},
  	get: function(val) {},
  	set: function(val) {},
  	alias: 'otherName',
  	immutable: true,
  	select: false,
  	index: true,
  	sparse: true,
  	lowercase: true,
  	uppercase: true,
  	trim: true
  }
  ```
  Core Options:
  | Options | Type | Description |
  | ---------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
  | `type` | `String` , `Number` , `Boolean` , `Date` , `Buffer` , `ObjectId` , `Array` , `Map` , `Mixed` , `Schema.Types.Whatever` | Data type of the field |
  | `required` | `Boolean` or `[true, ‘message’]` | Makes the field mandatory |
  | `default` | `Any` or `Function` | Default value if not provided |
  | `unique` | `Boolean` | Ensures uniqueness in the collection |
  | `index` | `Boolean` or `Object` | Creates an index on the field |
  | `sparse` | `Boolean` | Allows indexing only documents where the fields exists |
- **Schema Options Object (optional):**
  It defines how the schema behaves. Bellow is a comprehensive list of the most commonly used and powerful options that we can specify.
  | Options | Type | Description |
  | ---------------------- | --------- | -------------------------------------------------------------------------------------------- |
  | `timestamp` | `Boolean` | Automatically adds `createdAt` and `updatedAt` fields |
  | `versionKey` | `Boolean` | Enables/disables or rename the `_v` version field |
  | `collection` | `String` | Manually sets the MongoDB collection name |
  | `strict` | `Boolean` | Controls whether values not in the schema are saved or not ( `true` = ignore unknown fields) |
  | `strictQuery` | `Boolean` | Controls strict mode for queries |
  | `toObject` | `Object` | Configuration for `.toObject()` (e.g. virtual, getters) |
  | `toJSON` | `Object` | Configuration for `.toJSON()` (e.g. virtual, getters) |
  | `minimize` | `Boolean` | Removes empty object ( `{}` ) by default ( `true` ) |
  | `id` | `Boolean` | Adds virtual `id` field that is a string version of `_id` |
  | `_id` | `Boolean` | Controls automatic creation of `_id` field ( useful for subdocuments ) |
  | `validationBeforeSve` | `Boolean` | Set to `false` to skip validation before `save()` |
  | `timestamps.createAt` | `String` | Specify custom field name for `createdAt` |
  | `timestamps.updatedAt` | `String` | Specify custom field name for `updatedAt` |
