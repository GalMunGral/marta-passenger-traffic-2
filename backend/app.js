const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/cards', require('./routes/cards'));
app.use('/conflicts', require('./routes/conflicts'));
app.use('/stations', require('./routes/stations'));
app.use('/trips', require('./routes/trips'));
app.use('/report', require('./routes/report'));

app.listen(8080, () => {
  console.log('Listening on port 8080!')
});
