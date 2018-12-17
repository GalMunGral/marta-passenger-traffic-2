const { Station, Trip, sequelize } = require('../models');
const { parseRawData } = require('../utilities')
const Sequelize = require('sequelize');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const { minStartTime, maxStartTime } = req.query;
  console.log(req.query)
  console.log(maxStartTime)
  sequelize.query(`
    SELECT name, revenue, inFlow,
      IFNULL(outFlow, 0) AS outFlow,
      (inFlow - IFNULL(outFlow, 0)) AS flow
    FROM (
      SELECT s.stopId AS sid, s.name AS name,
        COUNT(*) AS inflow, SUM(t.tripfare) AS revenue
      FROM station AS s, trip AS t
      WHERE s.stopId = t.startsAt
        ${minStartTime ? `AND t.startTime >='${minStartTime}'` : ''}
        ${maxStartTime ? `AND t.StartTime <='${maxStartTime}'`: ''}
      GROUP BY t.startsAt
    ) AS i
      LEFT OUTER JOIN
    (
      SELECT s.stopId AS sid, COUNT(*) AS outFlow
      FROM trip AS t, station AS s
      WHERE t.endsAt = s.stopId
        ${minStartTime ? `AND t.startTime >='${minStartTime}'` : ''}
        ${maxStartTime ? `AND t.StartTime <='${maxStartTime}'`: ''}
      GROUP BY t.endsAt
    ) AS o
      ON i.sid = o.sid
  `).then(results => {
    res.send(JSON.stringify(results[0]));
  }).catch(error => {
    console.log(error);
    res.send({ error });
  })
});

module.exports = router;

