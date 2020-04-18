const md5 = require('md5');
const { User } = require('../models');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const SECRET = 'THERE IS NO SECRET';

router.post('/', async (req, res) => {
  let { username, password } = req.body;
  password = md5(password);

  let user;
  try {
    user = await User.findOne({
      where: { username, password }
    });
  } catch(error) {
    return res.status(500).send({ success: false, error });
  }

  if (!user) {
    return res.status(500).send({
      success: false,
      error: 'Incorrect credentials'
    });
  }

  const userType =  user.isAdmin ? "ADMIN" : "PASSENGER";

  jwt.sign({ username, userType }, SECRET, (err, accessToken) => {
    if (err) {
      return res.status(500).end();
    }
    res.send({
      success: true,
      username,
      userType,
      accessToken,
    });  
  })
});

module.exports = router;
