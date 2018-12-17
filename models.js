const Sequelize = require('sequelize');
const sequelize = new Sequelize('marta', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Breezecard = sequelize.import('./models/Breezecard');
const BusStationIntersection = sequelize.import('./models/BusStationIntersection');
const Conflict = sequelize.import('./models/Conflict');
const Passenger = sequelize.import('./models/Passenger');
const Station = sequelize.import('./models/Station');
const Trip = sequelize.import('./models/Trip');
const User = sequelize.import('./models/User');

// Some but not all users are passengers
User.hasOne(Passenger, { foreignKey: 'username' });
Passenger.belongsTo(User, { foreignKey: 'username' });

// Each passenger can have many breezecards
Passenger.hasMany(Breezecard, { foreignKey: 'belongsTo' });
Breezecard.belongsTo(Passenger, { foreignKey: 'belongsTo'});

// A passenger might claim many cards that belong to others
Passenger.hasMany(Conflict, { foreignKey: 'username' });
Conflict.belongsTo(Passenger, { foreignKey: 'username' });

// Each Breezecard might be claimed by many users
Breezecard.hasMany(Conflict, { foreignKey: 'breezecardNum' });
Conflict.belongsTo(Breezecard, { foreignKey: 'breezecardNum' });

// Each bus stations have one nearest intersection
Station.hasOne(BusStationIntersection, { foreignKey: 'stopId' });
BusStationIntersection.belongsTo(Station, { foreignKey: 'stopId' });

// A Breezecard can be used for multiple trips
Breezecard.hasMany(Trip, { foreignKey: 'breezecardNum' });
Trip.belongsTo(Breezecard, { foreignKey: 'breezecardNum' });

// A station might the start/end station of multiple trips
Station.hasMany(Trip, { as: 'StartTrips', foreignKey:'startsAt' });
Station.hasMany(Trip, { as: 'EndTrips', foreignKey: 'endsAt' });

Trip.belongsTo(Station, {as: 'StartStations', foreignKey: 'startsAt'});
Trip.belongsTo(Station, {as: 'EndStations', foreignKey: 'endsAt'});

module.exports = {
  Breezecard,
  BusStationIntersection,
  Conflict,
  Passenger,
  Station,
  Trip,
  User,
  sequelize
}