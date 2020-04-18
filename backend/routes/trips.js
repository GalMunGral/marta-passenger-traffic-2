const { Station, Passenger, Breezecard, Trip } = require('../models');
const { Op } = require('sequelize').Sequelize;
const { parseRawData } = require('../utilities')
const router = require('express').Router();

router.get('/', async (req, res) => {
  const { startTime, endTime, username, attr, dir } = req.query;
  let trips;

  // Two conditions to combine later
  const lowerBound = startTime ? {
    [Op.gte]: startTime
  } : {};
  const upperBound = endTime ? {
    [Op.lte]: endTime
  } : {}
  const timeCondition = (!startTime && !endTime)
    ? { [Op.not]: null } : Object.assign({}, lowerBound, upperBound);
  try{
    trips = await Trip.findAll({
      attributes: ['startTime', 'tripFare', 'breezecardNum'],
      where: {
        startTime: timeCondition
      },
      include: [{
        model: Station,
        as: 'StartStations',
        attributes: [['name', 'startStation']]
      }, {
        model: Station,
        as: 'EndStations',
        attributes: [['name', 'endStation']]
      }, {
        model: Breezecard,
        include: [{
          model: Passenger,
          where: { 
            username: username || { [Op.not]: null }
          }
        }],
        required: true
      }],
      raw: true
    });
  } catch(error) {
    return res.status(500).send(error)
  }
  trips = parseRawData(trips, attr, dir);
  res.send(JSON.stringify(trips))
});


router.post('/', async (req, res) => {
  const {
    breezecardNum,
    tripFare,
    startTime,
    startsAt,
    endsAt
  } = req.body;
  if (!(breezecardNum && tripFare && startTime && startsAt && endsAt)) {
    return res.status(500).send({ success: false, error: 'Missing fields'});
  }
  try {
    const card = await Breezecard.findOne({
      where: { breezecardNum }
    });
    if (card.value < tripFare) {
      throw 'Insufficient fund';
    }
    await Trip.create({
      tripFare,
      startTime,
      breezecardNum,
      startsAt,
      endsAt
    });
    await Breezecard.decrement('value', {
      by: tripFare,
      where: { breezecardNum }
    })
    res.send({ success: true })
  } catch(error) {
    return res.status(500).send(error)
  }
});

module.exports = router;
