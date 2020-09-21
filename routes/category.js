const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category');

router.get('', CategoryController.index);

module.exports = router;
