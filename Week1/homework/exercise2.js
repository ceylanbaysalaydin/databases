const mysql = require('mysql');
const util = require('util');
const queries = require('./exercise2-queries');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const connect = util.promisify(connection.connect.bind(connection));
const executeQuery = util.promisify(connection.query.bind(connection));

async function selectFromWorld() {
  try {
    await connect();
    await Promise.all(
      Object.keys(queries).map(async key => {
        console.log(key, await executeQuery(queries[key]));
      }),
    );
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
}

selectFromWorld();
