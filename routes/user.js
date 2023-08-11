
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authenticateUser = require('../middleware/authenticateUser');

const users = {};

router.post('/register', async (req, res) => {
  ////
});

router.post('/login', async (req, res) => {
  ////
});

router.get('/protected', authenticateUser, (req, res) => {
  ////
});

module.exports = router;

