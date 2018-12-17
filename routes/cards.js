const Op = require('sequelize').Sequelize.Op;
const { Breezecard, Conflict } = require('../models');
const { parseRawData } = require('../utilities');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const {
    belongsTo,
    breezecardNum,
    minValue,
    maxValue,
    attr,
    dir
  } = req.query;
  try {
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
    })
    return res.send(JSON.stringify(cards));
  } catch(error) {
    return res.send({ success: false, error });
  }
});

router.put('/:breezecardNum', async (req, res) => {
  const { breezecardNum } = req.params;
  const { value, username } = req.body;
  // const card = await Breezecard.findById(breezecardNum)
  // await card.increment('value', { by: value })
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
  const { username } = req.body;
  if (!username) {
    return res.send({success: false, error: 'Permission denied' });
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
    console.log(error)
    return res.send({ success: false, card, error });
  }  
})  

module.exports = router;