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

async function seedDatabase() {
  const createAuthorsTable =
    "CREATE TABLE IF NOT EXISTS Authors ( author_no int NOT NULL AUTO_INCREMENT, author_name varchar(50), university varchar(50), date_of_birth DATE , h_index int, gender enum('f','m'), CONSTRAINT PK_Authors PRIMARY KEY (author_no))";
  const addColumnToAuthors = '  ALTER TABLE Authors ADD COLUMN friend int';
  const addForeignKeyToAuthors =
    'ALTER TABLE Authors ADD CONSTRAINT FK_Authors FOREIGN KEY(friend) REFERENCES Authors(author_no)';

  try {
    await connect();

    await Promise.all[
      (executeQuery(createAuthorsTable),
      executeQuery(addColumnToAuthors),
      executeQuery(addForeignKeyToAuthors))
    ];

    connection.end();
  } catch (error) {
    console.error(error);
    connection.end();
  }
}

seedDatabase();
