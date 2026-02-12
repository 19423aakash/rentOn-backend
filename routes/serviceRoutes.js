const express = require('express');
const router = express.Router();
const { getServices, createService } = require('../controllers/serviceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getServices)
    .post(protect, admin, createService);

module.exports = router;
