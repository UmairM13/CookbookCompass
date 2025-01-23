const db = require("../../database");

const addBmi = (bmi, user_id, done) => {
  let sql = "UPDATE users SET bmi = ? WHERE user_id = ?";

  db.run(sql, [bmi, user_id], function (err) {
    if (err) {
      return done(err);
    }
    return done(null, bmi);
  });
};

module.exports = {
  addBmi,
};
