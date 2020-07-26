const express = require('express');
const UserCtrl = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', UserCtrl.create);
router.post('/login', UserCtrl.login);
router.put('/change-password/:id', UserCtrl.update);

module.exports = router;
