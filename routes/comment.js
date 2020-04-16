const express = require('express');
const authController = require('../controllers/authentication');
const commentController = require('../controllers/comment');
const validation = require('../validations/comment');
const router = express.Router({ mergeParams: true });

router.post('', authController.checkAuthentication, commentController.create);
router.delete('/:commentId', validation('destroy'), authController.checkAuthentication, commentController.destroy);

module.exports = router;
