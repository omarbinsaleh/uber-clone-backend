const express = require('express');
const router = express.Router();
const clientErrorControllers = require('../controllers/clientErrorControllers.js');

// define client error handling routes
router.use(clientErrorControllers.handleNotFoundRoutes)

// export client error handling router
module.exports = router;