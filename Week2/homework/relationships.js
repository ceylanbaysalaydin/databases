const mysql = require('mysql');
const util = require('util');
const { firstTwoTable, friendsColumn, Author_Paper } = require('./tables');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const connect = util.promisify(connection.connect.bind(connection));
const executeQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const createResearchPapersTable = `CREATE TABLE IF NOT EXISTS Research_Papers
     ( paper_id int NOT NULL AUTO_INCREMENT,
     paper_title varchar(100), conference varchar(50),
     publish_date DATE ,
     CONSTRAINT PK_Research_Papers PRIMARY KEY (paper_id))`;
  const createRelationTable = `CREATE TABLE IF NOT EXISTS Author_Paper 
     (author_id int, paper_id int,
     CONSTRAINT FK_Author FOREIGN KEY(author_id) REFERENCES Authors(author_no),
     CONSTRAINT FK_Paper FOREIGN KEY(paper_id) REFERENCES Research_Papers(paper_id),
     CONSTRAINT PK_Author_Paper PRIMARY KEY(author_id, paper_id) )`;
  try {
    await connect();

    await Promise.all[(executeQuery(createResearchPapersTable), executeQuery(createRelationTable))];

    await Promise.all(
      Object.keys(firstTwoTable).map(entity => {
        firstTwoTable[entity].map(async entityInstance => {
          await executeQuery(`INSERT INTO ${entity} SET ?`, entityInstance);
        });
      }),
    );

    await Promise.all(
      friendsColumn.map((item, index) => {
        executeQuery(`UPDATE Authors SET friend = ${item} WHERE author_no = ${++index} `);
      }),
    );

    await Promise.all(
      Author_Paper.map(entityInstance => {
        executeQuery(`INSERT INTO Author_Paper SET ?`, entityInstance);
      }),
    );
    connection.end();
  } catch (error) {
    console.error(error);
    connection.end();
  }
}

seedDatabase();
