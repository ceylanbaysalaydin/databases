const mysql = require('mysql');
const util = require('util');
const { query1, query2, query3, query4, query5 } = require('./queries');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const connect = util.promisify(connection.connect.bind(connection));
const executeQuery = util.promisify(connection.query.bind(connection));

async function selectWithAggregateFunctions() {
  try {
    await connect();
    console.log(
      'All research papers and the number of authors that wrote that paper:',
      await executeQuery(query1),
    );
    console.log(
      'Sum of the research papers published by all female authors:',
      await executeQuery(query2),
    );
    console.log(
      'Average of the h-index of all authors per university:',
      await executeQuery(query3),
    );
    console.log(
      'Sum of the research papers of the authors per university:',
      await executeQuery(query4),
    );
    console.log(
      'Minimum and maximum of the h-index of all authors per university.',
      await executeQuery(query5),
    );
    connection.end();
  } catch (error) {
    console.error(error);
    connection.end();
  }
}

selectWithAggregateFunctions();
