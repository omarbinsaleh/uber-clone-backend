const http = require('http');
const app = require('./app');
const port = process.env.SERVER_PORT || 5000;

// step 1: create the server
const server = http.createServer(app);

// step 2: listen the server
server.listen(port, () => {
   console.log(`Uber backend server is running on http://localhost:${port}`)
});