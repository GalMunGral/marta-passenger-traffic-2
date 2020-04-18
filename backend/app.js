const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const SECRET = "THERE IS NO SECRET";

const router = express.Router();
router.use('/login', require('./routes/login'));
router.use('/register', require('./routes/register'));
router.use('/cards', require('./routes/cards'));
router.use('/conflicts', require('./routes/conflicts'));
router.use('/stations', require('./routes/stations'));
router.use('/trips', require('./routes/trips'));
router.use('/report', require('./routes/report'));

app.use(bodyParser.json());

// JWT middleware
app.use((req, res, next) => {
  if (req.path === '/api/login' || req.path === '/api/register') {
    return next();
  }
  const authorizaiton = req.get('authorization');
  if (!authorizaiton) {
    return res.status(401).send({
      error: 'Missing `Authorization` header'
    });
  }
  const match = authorizaiton.match(/Bearer (?<token>.*)/);
  if (!match || !match.groups || !match.groups.token) {
    return res.status(401).send({
      error: 'Token malformed'
    });
  }
  const token = match.groups.token;
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send(err);
    }
    req.accessToken = decoded;
    next();
  });
})

app.use('/api', router);

app.listen(3000, () => {
  console.log('Listening on port 3000!')
});
