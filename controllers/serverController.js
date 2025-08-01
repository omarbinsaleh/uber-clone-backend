// @name: helloWorld
// @path: GET /
// @desc: display the 'hello world' message
const helloWorld = (req, res, next) => {
   res.send('Hello World!');
};

// @name: greetPeople
// @path: GET /
// @desc: welcome people to the Uber-clone-backend-server
const greetPeople = (req, res, next) => {
   res.send("Welcome to the Uber's backend server (cloned)")
};

// exports the server controllers
module.exports = { helloWorld, greetPeople };