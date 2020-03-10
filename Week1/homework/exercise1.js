const util = require('util');
const mysql = require('mysql');
const tables = require('./exercise1-tables');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const connect = util.promisify(connection.connect.bind(connection));
const executeQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const createInviteeTable =
    'CREATE TABLE IF NOT EXISTS Invitee (invitee_no int(3) ZEROFILL NOT NULL, invitee_name varchar(30), invited_by varchar(30), CONSTRAINT PK_Invitee_No PRIMARY KEY (invitee_no))';
  const createRoomTable =
    'CREATE TABLE IF NOT EXISTS Room ( room_no int NOT NULL, room_name varchar(30), floor_number int, CONSTRAINT PK_Room_No PRIMARY KEY (room_no))';
  const createMeetingTable =
    'CREATE TABLE IF NOT EXISTS Meeting ( meeting_no int NOT NULL AUTO_INCREMENT, meeting_title varchar(30), starting_time DATETIME NOT NULL , ending_time DATETIME, room_no int NOT NULL, CONSTRAINT PK_Meeting_No PRIMARY KEY (meeting_no))';

  try {
    await connect();
    await executeQuery('DROP DATABASE IF EXISTS meetup');
    await executeQuery('CREATE DATABASE IF NOT EXISTS meetup');
    await executeQuery('USE meetup');

    await Promise.all[
      (executeQuery(createInviteeTable),
      executeQuery(createRoomTable),
      executeQuery(createMeetingTable))
    ];

    await Promise.all(
      Object.keys(tables).map(entity => {
        tables[entity].map(async entityInstance => {
          await executeQuery(`INSERT INTO ${entity} SET ?`, entityInstance);
        });
      }),
    );
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
}

seedDatabase();
