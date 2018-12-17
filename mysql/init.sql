/* DROP TABLE trip;
DROP TABLE bus_station_intersection;
DROP TABLE station;
DROP TABLE conflict;
DROP TABLE breezecard;
DROP TABLE passenger;
DROP TABLE user; */

DROP DATABASE marta;

CREATE DATABASE marta;
USE marta;

CREATE TABLE user (
  username  VARCHAR(50),
  password  VARCHAR(50) NOT NULL,
  isAdmin  BOOLEAN NOT NULL,
  PRIMARY KEY (username)
) ENGINE=InnoDB;

CREATE TABLE passenger (
  username  VARCHAR(50),
  email     VARCHAR(50) NOT NULL,
  PRIMARY KEY (Username),
  UNIQUE (email),
  FOREIGN KEY (username) REFERENCES user(username) 
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE breezecard (
  breezecardNum CHAR(16),
  value       DECIMAL(6,2) NOT NULL,
  belongsTo  VARCHAR(50),
  PRIMARY KEY (breezecardNum),
  FOREIGN KEY (belongsTo) REFERENCES passenger(username)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CHECK (value >= 0.00 AND value <= 1000.00)
) ENGINE=InnoDB;

CREATE TABLE conflict (
  username        VARCHAR(50),
  breezecardNum  CHAR(16),
  dateTime 		  TIMESTAMP NOT NULL,
  CONSTRAINT pk_conflict PRIMARY KEY (username, breezecardNum),
  FOREIGN KEY (username) REFERENCES passenger(username)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (breezecardNum) REFERENCES breezecard(breezecardNum) 
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE station (
  stopId       VARCHAR(50),
  name          VARCHAR(50) NOT NULL,
  enterFare    DECIMAL(4,2) NOT NULL,
  closedStatus BOOLEAN NOT NULL,
  isTrain      BOOLEAN NOT NULL,
  PRIMARY KEY (stopId),
  UNIQUE (name, isTrain),
  CHECK (enterFare >= 0.00 AND enterFare <= 50.00)
) ENGINE=InnoDB;

CREATE TABLE bus_station_intersection (
  stopId       VARCHAR(50),
  intersection  VARCHAR(255),
  PRIMARY KEY (stopId),
  FOREIGN KEY (stopId) REFERENCES station(stopId)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE trip (
  tripFare       DECIMAL(4,2) NOT NULL,
  startTime 		  TIMESTAMP,
  breezecardNum  CHAR(16),
  startsAt 		  VARCHAR(50) NOT NULL,
  endsAt 			  VARCHAR(50),
  CONSTRAINT pk_trip PRIMARY KEY (startTime, breezecardNum),
  FOREIGN KEY (breezecardNum) REFERENCES breezecard(breezecardNum) 
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (startsAt) REFERENCES station(stopId)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (endsAt) REFERENCES station(stopId)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

/* Populate database */
/* admin123 */
INSERT INTO user VALUES ("admin","0192023a7bbd73250516f069df18b500",1);
/* imtheCEO */
INSERT INTO user VALUES ("kparker","09e5af83d93166c76b351d52a8fe69b5",1); 
/* interimCEO */
INSERT INTO user VALUES ("eoneil","6b11eaa6bbd19c856b59688fae281d56",1);
/* choochoo */
INSERT INTO user VALUES ("commuter14","439c7fd92969510d873330e327c0f64d",0);
/* roundandround */
INSERT INTO user VALUES ("busrider73","0e63f5aa002eca0b0e293ee6b733c50a",0);
/* iphonex */
INSERT INTO user VALUES ("sandrapatel","63c9e8af485ed2e845d29c2874e584ea",0);
/* tohellwga */
INSERT INTO user VALUES ("ignacio.john","6f5de409600e6ac40b8e7698bbd004f6",0);
/* Riyo4LIFE */
INSERT INTO user VALUES ("riyoy1996","7039e7594e4f4fd6789e9810150e64b9",0);
/* martapassword */
INSERT INTO user VALUES ("kellis","370133f7117dc65e277d6dbb858450c1",0);
/* 2Factor */
INSERT INTO user VALUES ("ashton.woods","27465020c9ea11fc41fac2af1daeba5f",0);
/* V3rySpecialAgent */
INSERT INTO user VALUES ("adinozzo","c67e443eaa780debf5ee2d71a2a7dc39",0);

INSERT INTO passenger VALUES ("commuter14","LeonBarnes@superrito.com");
INSERT INTO passenger VALUES ("busrider73","lena.wexler@dayrep.com");
INSERT INTO passenger VALUES ("sandrapatel","sandra74@jourrapide.com");
INSERT INTO passenger VALUES ("ignacio.john","john@iconsulting.com");
INSERT INTO passenger VALUES ("riyoy1996","yamada.riyo@navy.mil.gov");
INSERT INTO passenger VALUES ("kellis","kateellis@gatech.edu");
INSERT INTO passenger VALUES ("ashton.woods","awoods30@gatech.edu");
INSERT INTO passenger VALUES ("adinozzo","anthony.dinozzo@ncis.mil.gov");

INSERT INTO breezecard VALUES ("0919948381768459",126.50,"commuter14");
INSERT INTO breezecard VALUES ("1788613719481390",127.00,"busrider73");
INSERT INTO breezecard VALUES ("2792083965359460",20.00,"sandrapatel");
INSERT INTO breezecard VALUES ("0524807425551662",59.50,"ignacio.john");
INSERT INTO breezecard VALUES ("7792685035977770",80.25,"riyoy1996");
INSERT INTO breezecard VALUES ("1325138309325420",97.00,"kellis");
INSERT INTO breezecard VALUES ("6411414737900960",41.00,"ashton.woods");
INSERT INTO breezecard VALUES ("9248324548250130",12.75,"sandrapatel");
INSERT INTO breezecard VALUES ("8753075721740010",110.00,"sandrapatel");
INSERT INTO breezecard VALUES ("7301442590825470",6.00,"sandrapatel");
INSERT INTO breezecard VALUES ("4769432303280540",68.50,"sandrapatel");
INSERT INTO breezecard VALUES ("4902965887533820",79.75,"sandrapatel");
INSERT INTO breezecard VALUES ("0475861680208144",35.25,"commuter14");
INSERT INTO breezecard VALUES ("5943709678229760",133.50,"commuter14");
INSERT INTO breezecard VALUES ("2613198031233340",45.00,"commuter14");
INSERT INTO breezecard VALUES ("2286669536044610",0.50,"commuter14");
INSERT INTO breezecard VALUES ("6424673176102560",27.00,"commuter14");
INSERT INTO breezecard VALUES ("4792323707679860",34.00,"commuter14");
INSERT INTO breezecard VALUES ("2006517782865770",127.25,"commuter14");
INSERT INTO breezecard VALUES ("3590098235166490",16.25,"commuter14");
INSERT INTO breezecard VALUES ("2275718423410130",143.25,"commuter14");
INSERT INTO breezecard VALUES ("8802558078528210",42.25,"busrider73");
INSERT INTO breezecard VALUES ("9712526903816770",68.50,"busrider73");
INSERT INTO breezecard VALUES ("6603808416168570",41.50,"busrider73");
INSERT INTO breezecard VALUES ("9286930794479390",116.25,"kellis");
INSERT INTO breezecard VALUES ("0123456780987654",140.25,NULL);
INSERT INTO breezecard VALUES ("9876543212345670",92.50,NULL);
INSERT INTO breezecard VALUES ("7534785562588930",85.50,"adinozzo");
INSERT INTO breezecard VALUES ("3346822267258650",113.00,NULL);
INSERT INTO breezecard VALUES ("1258825691462690",144.75,NULL);
INSERT INTO breezecard VALUES ("4156771407939460",110.50,NULL);
INSERT INTO breezecard VALUES ("1156635952683150",141.00,NULL);

INSERT INTO conflict VALUES ("sandrapatel","0475861680208144","2018-11-12 00:00:01");
INSERT INTO conflict VALUES ("kellis","4769432303280540","2017-10-23 16:21:49");
INSERT INTO conflict VALUES ("riyoy1996","4769432303280540","2017-10-24 07:31:12");

INSERT INTO station VALUES ("N11","North Springs",2.50,0,1);
INSERT INTO station VALUES ("BUSN11","North Springs",2.00,0,0);
INSERT INTO station VALUES ("N10","Sandy Springs",2.00,0,1);
INSERT INTO station VALUES ("N9","Dunwoody",3.00,0,1);
INSERT INTO station VALUES ("N8","Medical Center",4.00,0,1);
INSERT INTO station VALUES ("N7","Buckhead",1.00,0,1);
INSERT INTO station VALUES ("N6","Lindbergh Center",2.00,0,1);
INSERT INTO station VALUES ("N5","Arts Center",4.00,0,1);
INSERT INTO station VALUES ("N4","Midtown",5.00,0,1);
INSERT INTO station VALUES ("BUSN4","Midtown",5.00,0,0);
INSERT INTO station VALUES ("N3","North Avenue",3.00,0,1);
INSERT INTO station VALUES ("N2","Civic Center",4.00,0,1);
INSERT INTO station VALUES ("N1","Peachtree Center",6.00,0,1);
INSERT INTO station VALUES ("FP","Five Points",8.00,0,1);
INSERT INTO station VALUES ("S1","Garnett",10.00,0,1);
INSERT INTO station VALUES ("S2","West End",25.00,0,1);
INSERT INTO station VALUES ("BUSS2","West End",2.50,0,0);
INSERT INTO station VALUES ("S3","Oakland City",5.00,0,1);
INSERT INTO station VALUES ("S4","Lakewood/Ft. McPherson",2.50,1,1);
INSERT INTO station VALUES ("S5","East Point",2.50,0,1);
INSERT INTO station VALUES ("S6","College Park",2.50,0,1);
INSERT INTO station VALUES ("S7","Atlanta Airport",2.50,0,1);
INSERT INTO station VALUES ("W5","Hamilton E. Holmes",2.50,1,1);
INSERT INTO station VALUES ("W4","West Lake",2.50,0,1);
INSERT INTO station VALUES ("W3","Ashby",2.50,0,1);
INSERT INTO station VALUES ("W2","Vine City",2.50,0,1);
/* INSERT INTO station VALUES ("W1","GA Dome, GA World Congress Center, Phillips Arena, CNN Center",2.50,0,1); */
INSERT INTO station VALUES ("BUSDOME","Georgia Dome Bus Station",4.00,0,0);
INSERT INTO station VALUES ("E1","Georgia State",2.50,0,1);
INSERT INTO station VALUES ("E2","King Memorial",2.50,0,1);
INSERT INTO station VALUES ("E3","Inman Park/Reynolds Town",2.50,0,1);
INSERT INTO station VALUES ("E4","Edgewood/Candler Park",2.50,0,1);
INSERT INTO station VALUES ("E5","East Lake",3.00,0,1);
INSERT INTO station VALUES ("E6","Decatur",2.50,0,1);
INSERT INTO station VALUES ("E7","Avondale",2.50,0,1);
INSERT INTO station VALUES ("E8","Kensington",3.00,0,1);
INSERT INTO station VALUES ("E9","Indian Creek",2.50,0,1);
INSERT INTO station VALUES ("P4","Bankhead",1.00,1,1);
INSERT INTO station VALUES ("35161","Old Milton Pkwy - Park Bridge Pkwy",2.00,1,0);
INSERT INTO station VALUES ("31955","Old Milton Pkwy - North Point Pkwy",2.00,0,0);
INSERT INTO station VALUES ("95834","Old Milton Pkwy - Haynes Bridge Pkwy",2.00,0,0);
INSERT INTO station VALUES ("46612","Alpharetta Hwy - Commerce Pkwy",2.00,0,0);

INSERT INTO bus_station_intersection VALUES ("BUSN11","Peachtree-Dunwoody Road");
INSERT INTO bus_station_intersection VALUES ("BUSDOME",NULL);
INSERT INTO bus_station_intersection VALUES ("BUSN4","10th Street");
INSERT INTO bus_station_intersection VALUES ("BUSS2",NULL);
INSERT INTO bus_station_intersection VALUES ("35161","Park Bridge Pkwy");
INSERT INTO bus_station_intersection VALUES ("31955","North Point Pkwy");
INSERT INTO bus_station_intersection VALUES ("95834","Haynes Bridge Pkwy");
INSERT INTO bus_station_intersection VALUES ("46612","Commerce Pkwy");

INSERT INTO trip VALUES (2.75,"2017-11-05 16:21:49","0524807425551662","N11","N4");
INSERT INTO trip VALUES (1.50,"2017-11-03 09:44:11","0524807425551662","N4","N11");
INSERT INTO trip VALUES (10.50,"2017-11-02 13:11:11","1788613719481390","BUSDOME","BUSN11");
INSERT INTO trip VALUES (4.00,"2017-11-02 13:11:11","2792083965359460","31955","46612");
INSERT INTO trip VALUES (2.00,"2017-10-31 22:33:10","0524807425551662","S7","N4");
INSERT INTO trip VALUES (3.50,"2017-10-31 22:31:10","7792685035977770","E1","N3");
INSERT INTO trip VALUES (1.00,"2017-10-31 21:30:00","1325138309325420","FP",NULL);
INSERT INTO trip VALUES (3.50,"2017-10-28 22:30:10","6411414737900960","N11","N4");
INSERT INTO trip VALUES (1.50,"2017-10-28 22:11:13","9248324548250130","N4","N11");
INSERT INTO trip VALUES (1.00,"2017-10-27 09:40:11","8753075721740010","N3","N4");
INSERT INTO trip VALUES (9.00,"2017-10-27 04:31:30","7301442590825470","N4","S7");
INSERT INTO trip VALUES (1.50,"2017-10-10 00:00:00","7534785562588930","BUSS2","BUSDOME");
