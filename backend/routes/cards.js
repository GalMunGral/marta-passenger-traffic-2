const { Op } = require('sequelize').Sequelize;
const { Breezecard } = require('../models');
const router = require('express').Router();
const { generateCardNumber } = require('../utilities');

router.get('/', async (req, res) => {
  const {
    belongsTo,
    breezecardNum,
    minValue,
    maxValue,
  } = req.query;
  try {
    console.log(req.accessToken)
    if (req.accessToken.userType === 'PASSENGER') {
      if (belongsTo !== req.accessToken.username) {
        return res.status(401).send({
          error: 'You can only access your own card!'
        })
      }
    }
    const cards = await Breezecard.findAll({
      attributes: [ 'breezecardNum', 'value', 'belongsTo'],
      where: {
        belongsTo: belongsTo || { [Op.not]: null },
        breezecardNum: breezecardNum || { [Op.not]: null },
        value: maxValue ? {
          [Op.gte]: minValue || 0,
          [Op.lte]: maxValue, 
        } : { 
          [Op.gte]: minValue || 0 
        }
      },
      raw: true
    }).map(card => ({ ...card, value: Number(card.value) }));
    return res.send(cards);
  } catch(error) {
    return res.status(500).send({ success: false, error });
  }
});

router.post('/', async (req, res) => {
  const { username } = req.body;
  if (username !== req.accessToken.username) {
    return res.status(401).end();
  }
  try {
    const breezecardNum = generateCardNumber()
    Breezecard.create({
      breezecardNum,
      value: 100,
      belongsTo: username
    });
    return res.send({
      success: true,
      breezecardNum
    });
  } catch(e) {
    return res.status(500).send(e);
  }
});

router.put('/:breezecardNum', async (req, res) => {
  const { breezecardNum } = req.params;
  const { value, username } = req.body;
  await Breezecard.update({
    value,
    belongsTo: username
  }, {
    where: { breezecardNum }
  });
  res.send({ success: true });
});

router.delete('/:breezecardNum', async (req, res) => {
  const { breezecardNum } = req.params;
  const { username } = req.accessToken;
  if (!username) {
    return res.status(401).end();
  }
  let card;
  try {
    card = await Breezecard.findOne({
      where: { breezecardNum }
    });
    if (card.belongsTo !== username) {
      throw 'You don\'t own this card';
    }
    await Breezecard.update({
      belongsTo: null
    }, {
      where: { breezecardNum, belongsTo: username }
    });
    return res.send({ success: true, card });
  } catch(error) {
    return res.status(500).send({ success: false, card, error });
  }  
})  

module.exports = router;
