const md5 = require('md5');
const { User } = require('../models');
const router = require('express').Router();

router.post('/', async (req, res) => {
  let { username, password } = req.body;
  console.log(password)
  password = md5(password);
  let user;
  console.log(username, password)
  try {
    user = await User.findOne({
      where: { username, password }
    });
  } catch(error) {
    return res.send({ success: false, error });
  }

  if (!user) {
    return res.send({
      success: false,
      error: 'Incorrect credentials'
    });
  }

  const userType =  user.isAdmin ? "ADMIN" : "PASSENGER";
  return res.send({ success: true, userType });
});

module.exports = router;
