host=localhost:8080

GET() {
  # echo $1
  curl -sS $1 | python -m json.tool
}

POST() {
  if [ -z "$2" ]
  then curl -sSX POST $1 | python -m json.tool
  else curl -sS -H 'Content-Type:application/json' -d "$2" $1\
    | python -m json.tool
  fi
}

DELETE() {
  if [ -z "$2" ]
  then curl -gsSX DELETE $1 | python -m json.tool
  else curl -sS -X DELETE -H 'Content-Type:application/json' -d "$2" $1 \
    | python -m json.tool
  fi
}

PUT() {
  if [ -z "$2" ]
  then curl -gsSX PUT $1 | python -m json.tool
  else curl -sS -X PUT -H 'Content-Type:application/json' -d "$2" $1 \
    | python -m json.tool
  fi
}

echo 'POST /login { username, password }'
POST $host/login '{
  "username":"admin",
  "password":"admin123"
}'
echo

echo 'POST /register { username, password, email }'
POST $host/register '{
  "username":"wenqi",
  "password":"pass",
  "email":"wenqi@gmail.cm2"
}'
POST $host/login '{"username":"wenqi","password":"pass"}'
echo

echo 'GET /cards'
GET $host/cards
echo

echo 'PUT /cards/:id { value, username }'
PUT $host/cards/0475861680208144 '{
  "value":200,
  "username":"kellis"
}'
echo

echo 'DELETE /cards/:id (no username)'
DELETE $host/cards/9248324548250130
echo

echo 'DELETE /cards/:id { username }'
DELETE $host/cards/9248324548250130 '{
  "username":"sandrapatel"
}'
echo

echo 'GET /stations'
GET $host/stations
echo

echo 'GET /conflicts?attr=<name>&order=(asc|desc)'
GET "$host/conflicts?attr=username&order=desc"
echo

echo 'POST /conflicts { username, breezecardNum }'
POST $host/conflicts '{
  "username":"commuter14",
  "breezecardNum":"0475861680208144"
}'
echo

echo 'GET /trips[?startTime=<TIMESTAMP>[&endTime=startTime=<TIMESTAMP>]]>'
echo 'GET /trips[?username=<username>]'
GET $host/trips
# TIME IS A LITTLE BIT OFF
GET $host/trips?startTime=2017-11-02%2013:11:11
GET $host/trips?endTime=2017-10-31%2021:30:01
GET $host/trips?endTime=2017-10-27%2009:40:11&startTime=2017-10-27%2009:40:11 
GET $host/trips?username=sandrapatel
echo

echo 'POST /trips (missing fields)'
POST $host/trips '{
  "breezecardNum":"7534785562588930",
  "tripFare":"10"
}'
echo 'POST /trips { breezecardNum, tripFare, startTime, startsAt, endsAt }'
POST $host/trips '{
  "breezecardNum":"7534785562588930",
  "tripFare":"10",
  "startTime":"2018-12-01 00:00:00",
  "startsAt":"FP",
  "endsAt":"BUSDOME"
}'
echo

echo 'GET /stations'
GET $host/stations

echo 'PUT /stations/:id (no body)'
PUT $host/stations/BUSN11

echo 'PUT /stations/:id { enterFare?, closedStatus?, isTrain?, intersection? }'
PUT $host/stations/BUSN11 '{
  "enterFare":28.3,
  "closedStatus":true
}'
PUT $host/stations/BUSN4 '{
  "enterFare":25.8,
  "closedStatus":false,
  "isTrain":false,
  "intersection":"hahahaha"
}'
echo

echo 'GET /report[?minStartTime=<TIMESTAMP>&maxStartTime=<TIMESTAMP>]'
GET $host/report
GET "$host/report?minStartTime=2017-11-03%2009:44:11&maxStartTime=2017-12-31%2019:00:00"
GET "$host/report?minStartTime=2017-12-30%2019:00:00&maxStartTime=2018-1-1%2019:00:00 "
echo
