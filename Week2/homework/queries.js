'use strict';

const query1 = `SELECT rp.paper_title,
COUNT(DISTINCT a.author_no) 
AS 'Number of Authors'
FROM Authors a RIGHT JOIN Author_Paper p 
ON (a.author_no = p.author_id)
RIGHT JOIN Research_Papers rp 
ON (p.paper_id = rp.paper_id) 
GROUP BY rp.paper_title`;
const query2 = `SELECT COUNT(DISTINCT rp.paper_title)
AS 'Sum of the Research Papers written by female'
FROM Authors a 
RIGHT JOIN Author_Paper p
ON (a.author_no = p.author_id)
RIGHT JOIN Research_Papers rp
ON (p.paper_id = rp.paper_id) 
where a.gender="f"`;
const query3 = `SELECT AVG(a.h_index)
AS 'average of h-index', a.university 
FROM Authors a group by a.university`;
const query4 = `SELECT a.university ,
COUNT(DISTINCT rp.paper_title) 
AS 'Sum of the Research Papers'
FROM Authors a 
LEFT JOIN Author_Paper p
ON (a.author_no = p.author_id)
LEFT JOIN Research_Papers rp
ON (p.paper_id = rp.paper_id) 
GROUP BY a.university`;
const query5 = `SELECT MIN(a.h_index)
AS 'MIN of h-index',
MAX(a.h_index) AS 'MAX of h-index',
a.university
FROM Authors a
GROUP BY a.university;`;

module.exports = { query1, query2, query3, query4, query5 };
