--including suspended cards
SELECT b.BreezecardNum, b.Value, b.BelongsTo
FROM Breezecard AS b NATURAL LEFT OUTER JOIN Conflict
WHERE BelongsTo = ($Owner) AND
BreezecardNum = ($cardNumber) AND
Value >= ($minValue) AND
Value <= ($maxValue) AND
ORDER BY ($column) ASC

--excluding suspended cards
SELECT b.BreezecardNum, b.Value, b.BelongsTo
FROM Breezecard AS b NATURAL LEFT OUTER JOIN Conflict
WHERE BelongsTo = ($Owner) AND
BreezecardNum = ($cardNumber) AND
Value >= ($minValue) AND
Value <= ($maxValue) AND
DateTime IS NULL
ORDER BY ($column) ASC


--FLOW REPORT
SELECT A.Name AS Name, InFlow, IFNULL(OutFlow, 0) AS OutFlow, (InFlow - IFNULL(OutFlow, 0)) AS Flow, A.Revenue AS Revenue
FROM
(SELECT S.StopID AS SID, S.Name AS Name, COUNT(*) AS Inflow, SUM(T.Tripfare) AS Revenue, T.StartTime
FROM Station AS S, Trip AS T
WHERE S.StopID = T.StartsAt AND
T.StartTime >= ($startTimeLB) AND
T.StartTime <= ($startTimeUB)
GROUP BY T.StartsAt) AS A
LEFT OUTER JOIN
(SELECT S.StopID AS SID, S.Name AS Name, COUNT(*) AS Outflow, SUM(T.Tripfare) AS Revenue, T.StartTime
FROM Station AS S, Trip AS T
WHERE S.StopID = T.EndsAt
T.StartTime >= ($startTimeLB) AND
T.StartTime <= ($startTimeUB)
GROUP BY T.EndsAt) AS B
ON A.SID = B.SID
ORDER BY ($column) ASC

--fetch suspended cards
SELECT BreezecardNum, Username, DateTime, BelongsTo
FROM Breezecard NATURAL JOIN Conflict
ORDER BY ($column) ASC;

--create (train) station
INSERT INTO Station VALUES (($name), ($id), ($fare), ($isOpen), ($isTrainStation));
--create bus stations
INSERT INTO BusStationIntersection VALUES (($id), ($intersection));

--update station
UPDATE Station
SET EnterFare = ($fare), ClosedStatus = ($status)
WHERE StopID = ($id);

--resolve conflict
--1. assign card to new/old passenger
UPDATE Breezecard
SET BelongsTo = ($username)
WHERE BreezecardNum = ($cardNo);
--2. delete conflict entry
DELETE FROM Conflict WHERE BreezecardNum = ($cardNo);

--update card value
UPDATE Breezecard
SET Value = ($value)
WHERE BreezecardNum = ($cardNo);

--update card owner'
UPDATE Breezecard
SET BelongsTo = ($owner)
WHERE BreezecardNum = ($cardNo);

--login
SELECT * FROM User
WHERE Username = ($username)
    AND Password = ($password);

--register
--1. add user
INSERT INTO User VALUES (($username), ($password), 0);
--2. add passenger
INSERT INTO Passenger VALUES (($username), ($email));
--3. register using new card
INSERT INTO Breezecard VALUES ($cardNo), 0, ($username));
--4. register using existing card
SELECT * FROM Breezecard WHERE BreezecardNum = ($cardNo);
--5. if the 'existing' card is not in database
INSERT INTO Breezecard VALUES (($cardNo), 0, ($username));
--6. if the card is in database but there is no owner
UPDATE Breezecard
SET BelongsTo = ($username)
WHERE BreezecardNum = ($cardNo)
--7. if there is already a owner
INSERT INTO Conflict VALUES (($username),($cardNo), NOW());

--fetch stations
SELECT Name, StopID, EnterFare, ClosedStatus, IsTrain, Intersection
FROM Station NATURAL LEFT OUTER JOIN BusStationIntersection
ORDER BY ($column) ASC;

--fetch cards that belong to current passenger
SELECT BreezecardNum, Value
FROM Breezecard
WHERE BelongsTo = ($username)
ORDER BY ($column) ASC;

--record trip
--1. retrieve breeze card
SELECT *
FROM Breezecard
WHERE BreezecardNum = ($cardNo);
--2. add trip
INSERT INTO Trip 
VALUES (($fare), ($startTime), ($cardNo), ($startId), ($endId)));
--3. update breeze card value
UPDATE Breezecard
SET VALUE = VALUE - ($fare)
WHERE BreezecardNum = ($cardNo);

--add new card
--1. check if card already exists
SELECT *
FROM Breezecard
WHERE BreezecardNum = ($cardNo);
--2. initialize card value
INSERT INTO Breezecard
VALUES (($cardNo)), 0, ($username)));
--3. if card exists but does not belong to another passenger
UPDATE Breezecard
SET BelongsTo = ($username)
WHERE BreezecardNum = ($cardNo);
--4. if card exists and there is conflict
INSERT INTO Conflict
VALUES (($username)), ($cardNo)), NOW());

--add value to card
UPDATE Breezecard
SET Value = Value + ($value)
WHERE BreezecardNum = ($cardNo);

--remove card
UPDATE Breezecard
SET BelongsTo = NULL
WHERE ($username) IN (
        SELECT *
        FROM (
            SELECT BelongsTo
            FROM Breezecard
            GROUP BY BelongsTo
            HAVING COUNT(*) > 1
        ) AS TGT
    )
    AND BreezecardNum = ($cardNo),

--fetch trip history
SELECT T.StartTime AS Time, SS.Name AS SName, DS.Name AS DName, T.Tripfare AS Fare, T.BreezecardNum AS BNumber
FROM Trip AS T, Station AS SS, Station AS DS, Passenger AS P, Breezecard AS B
WHERE T.StartsAt = SS.StopID
    AND T.EndsAt = DS.StopID
    AND T.BreezecardNum = B.BreezecardNum
    AND B.BelongsTo = P.Username
    AND P.Username = ($username)
    AND T.StartTime >= ($startTime)
    AND T.StartTime <= ($endTime)
ORDER BY Time ASC;
