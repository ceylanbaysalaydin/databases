const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const connect = util.promisify(connection.connect.bind(connection));
const executeQuery = util.promisify(connection.query.bind(connection));

async function selectWithJoins() {
  const authorNamesAndTheirFriends = `SELECT a.author_name 
    AS author_name,
    b.author_name AS friend_name
    FROM Authors a
    LEFT JOIN Authors b 
    ON a.author_no = b.friend`;
  const authorsAndTheirResearchPapersTitle = `SELECT a.author_name,
     rp.paper_title 
     FROM Authors a 
     LEFT JOIN Author_Paper p 
     ON (a.author_no = p.author_id)
     LEFT JOIN Research_Papers rp 
     ON (p.paper_id = rp.paper_id)`;
  try {
    await connect();
    console.log(
      'Author names and their friends : ',
      await executeQuery(authorNamesAndTheirFriends),
    );
    console.log(
      'Authors and their research papers title : ',
      await executeQuery(authorsAndTheirResearchPapersTitle),
    );

    connection.end();
  } catch (error) {
    console.error(error);
    connection.end();
  }
}

selectWithJoins();
