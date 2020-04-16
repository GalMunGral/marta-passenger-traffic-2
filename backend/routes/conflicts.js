const _ = require('lodash');
const { Breezecard, Conflict } = require('../models');
const { parseRawData } = require('../utilities');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const { attr, order } = req.query;
  console.log(attr, order)
  try{
    let conflicts = await Conflict.findAll({
      attributes: [ 'username', 'dateTime'],
      include: [{
        model: Breezecard,
        attributes: ['breezecardNum', 'belongsTo']
      }],
      raw: true
    });
    conflicts = parseRawData(conflicts, attr, order);
    return res.send(conflicts);
  } catch(error) {
    return res.send(error);
  }
});

router.post('/', async (req, res) => {
  const { username, breezecardNum } = req.body;
  if (!username) {
    return res.send({ success: false, error: 'Username missing' });
  }
  if (!breezecardNum) {
    return res.send({ success: false, error: 'Card number missing' });
  }
  let conflicts;
  try{
    conflicts = await Conflict.findAll({
      attributes: [ 'username' ],
      where: { breezecardNum },
      include: [{
        model: Breezecard,
        attributes: ['breezecardNum', 'belongsTo']
      }],
      raw: true
    });
    conflicts = parseRawData(conflicts);
    if (conflicts.length === 0) throw 'There is no conflict on this card';
    // All users who own or claim this card
    const users = _.flatMap(conflicts, c => [c.belongsTo, c.username]);
    if (!users.includes(username)) {
      throw 'Cannot asign to a thrid person';
    }
    await Breezecard.update({
      belongsTo: username
    }, {
      where: { breezecardNum }
    });
    await Conflict.destroy({
      where: { breezecardNum }
    });
    return res.send({ success: true });
  } catch(error) {
    console.log(error);
    return res.send({ success: false, error });
  }
});

module.exports = router;
