const md5 = require('md5');
const { User, Passenger, Breezecard, Conflict } = require('../models');
const { generateCardNumber } = require('../utilities');
const router = require('express').Router();

router.post('/', async (req, res) => {
  let {
    username,
    password,
    email,
    breezecardNum
  } = req.body;
  password = md5(password);
  
  if (!username) {
    return res.send({ success: false, error: 'Username missing' })
  }
  if (!password) {
    return res.send({ success: false, error: 'Password missing'})
  }
  if (!email) {
    return res.send({ success: false, error: 'Email missing' })
  }
 
  // Create user account
  try {
    // Check if the account already exists
    let user = await User.findOne({
      where: { username, password }
    });
    if (!user) {
        user = await User.create({
        username,
        password,
        isAdmin: 0
      });
    }
  } catch(error) {
    return res.send({ success: false, error });
  }
  
  // Create passenger
  try {
    const passenger = await Passenger.findOne({
      where: { username, email}
    });
    if (passenger) throw 'Account already exists';
    await Passenger.create({ username, email });
  } catch(error) {
    return res.send({ success: false, error });
  }

  // If no card# is provided
  if (!breezecardNum) {
    breezecardNum = generateCardNumber();
    await Breezecard.create({ breezecardNum, value: 0, username});
  } else {

    // Check if the card is already created
    const card = await Breezecard.findOne({
      where: { breezecardNum: breezecardNum }
    });
    if (!card) {
      // It's a new card
      await Breezecard.create({
        breezecardNum,
        value: 0,
        username
      });
    } else if (!card.belongsTo) {
      // The cad exists but is not owned by anyone
      await Breezecard.update({ 
        belongsTo: username
      }, { 
        breezecardNum 
      });
    } else if (card.belongsTo !== username) {
      // The card is currently used by someone else
      await Conflict.create({
        username,
        breezecardNum,
        dateTime: sequelize.fn('NOW')
      });
      // Get a random card
      const breezecardNum = generateCardNumber();
      Breezecard.create({
        breezecardNum,
        value: 0,
        username
      });
    }
  }
  res.send({
    success: true,
    username,
    password,
    email
  });
});

module.exports = router;
