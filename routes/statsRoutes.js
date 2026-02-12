const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/statsController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, getDashboardStats);

module.exports = router;
