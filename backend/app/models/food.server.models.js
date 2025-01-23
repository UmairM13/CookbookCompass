const db = require("../../database");

const getFood = (q, done) => {
  let query = `
    Select foodId,name, image from Foods 
  `;
  if (q) {
    query += "WHERE name LIKE '%" + q + "%'";
  }

  // Execute the query
  db.all(query, async function (err, rows) {
    if (err) {
      return done(err);
    }
    // console.log(rows);
    return done(rows);
  });
};

module.exports = {
  getFood,
};
