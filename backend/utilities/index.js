const _ = require('lodash');

const parseRawData = (vals, attr, order)  => {
  let unordered = vals.map(v => {
    return _.mapValues(v, (o) => {
      return o && !isNaN(o) ?  Number(o): o
    });
  }).map(v => _.mapKeys(v, (o, k) => {
    return  k.includes('.') ? _.split(k, '.')[1] : k;
  }));
  if (attr && order) {
    return _.orderBy(unordered, attr, order)
  }
  return unordered;
}

const generateCardNumber = () => (
  Math.floor(Math.random() * Math.pow(10, 16))
);

module.exports = {
  parseRawData,
  generateCardNumber
}
