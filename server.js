const http = require('http');
const app = require('./app');
const port = process.env.SERVER_PORT || 5000;

// create the server
const server = http.createServer(app);

// listen the server
server.listen(port, () => {
   console.log(`Uber backend server is running on http://localhost:${port}`)
});