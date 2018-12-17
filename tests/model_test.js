const express = require('express');
const app = require('express')();

const {
  Breezecard,
  BusStationIntersection,
  Conflict,
  Passenger,
  Station,
  Trip,
  User
} = require('../models');

// passenger LEFT OUTER JOIN conflict
Passenger.findAll({ include: [Conflict] })
  .then(vals => vals.map(d => d.dataValues))
  .then(vals => vals.map(d => ({
    ...d,
    conflicts: d.conflicts.map(d => d.dataValues)
  })))
  .then(result => console.log(result.length > 0));

// conflict LEFT OUTER JOIN passenger
Conflict.findAll({ include: [Passenger] })
  .then(vals => vals.map(d => d.dataValues))
  .then(vals => vals.map(d => ({
    ...d,
    passenger: d.passenger.dataValues
  })))
  .then(result => console.log(result.length > 0));

// breezecard LEFT OUTER JOIN conflict
Breezecard.findAll({ include: [Conflict] })
  .then(vals => vals.map(d => d.dataValues))
  .then(vals => vals.map(d => ({
    ...d,
    conflicts: d.conflicts.map(d => d.dataValues)
  })))
  .then(result => console.log(result.length > 0));

// conflict LEFT OUTER JOIN breezecard
Conflict.findAll({ include: [Breezecard] })
  .then(vals => vals.map(d => d.dataValues))
  .then(vals => vals.map(d => ({
    ...d,
    breezecard: d.breezecard.dataValues
  })))
  .then(result => console.log(result.length > 0));

// station LEFT OUTER JOIN bus_station_intersection
Station.findAll({ include: [BusStationIntersection] })
  .then(vals => vals.map(d => d.dataValues))
  .then(vals => vals.map(d => ({
    ...d,
    bus_station_intersection: d.bus_station_intersection ? 
      d.bus_station_intersection.dataValues : null
  })))
  .then(result => console.log(result.length > 0));

// bus_station_intersection LEFT OUTER JOIN station
BusStationIntersection.findAll({ include: [Station] })
  .then(vals => vals.map(d => d.dataValues))
  .then(vals => vals.map(d => ({
    ...d,
    station: d.station ? d.station.dataValues : null
  })))
  .then(result => console.log(result.length > 0));

// breezecard LEFT OUTER JOIN trip
Breezecard.findAll({ include: [Trip] })
  .then(vals => vals.map(d => d.dataValues))
  .then(vals => vals.map(d => ({
    ...d,
    trips: d.trips.map(d => d.dataValues)
  })))
  .then(result => console.log(result.length > 0));

// breezecard LEFT OUTER JOIN trip
Station.findAll({ include: [
  { model: Trip, as: 'StartTrips' }
] })
  .then(vals => vals.map(d => d.dataValues))
  .then(vals => vals.map(d => ({
    ...d,
    // trips: d.trips.map(d => d.dataValues)
  })))
  .then(result => console.log(result.length > 0));

// breezecard LEFT OUTER JOIN trip
Station.findAll({ include: [
  { model: Trip, as: 'EndTrips' }
] })
  .then(vals => vals.map(d => d.dataValues))
  .then(vals => vals.map(d => ({
    ...d,
    // trips: d.trips.map(d => d.dataValues)
  })))
  .then(result => console.log(result.length > 0));

// breezecard LEFT OUTER JOIN trip
Trip.findAll({ include: [
  { model: Station, as: 'StartStations' }
] })
  .then(vals => vals.map(d => d.dataValues))
  .then(vals => vals.map(d => ({
    ...d,
    // trips: d.trips.map(d => d.dataValues)
  })))
  .then(result => console.log(result.length > 0));

// breezecard LEFT OUTER JOIN trip
Trip.findAll({
  include: [{
    model: Station,
    as: 'EndStations'
  }]
}).then(result => console.log(result.length > 0));

  app.listen(3000, () => {
  console.log('Listening on port 3000!')
});