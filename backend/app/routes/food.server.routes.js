const foods = require("../controllers/food.server.controllers");
const auth = require("../middleware/authentication.middleware");

module.exports = function (app) {
  app.route("/foodsSearch").get(foods.get_food);

  //   app.route("/foodsbyFilter").post(users.login);

  //   app.route("/foods/:foodsId").post(users.logout);
};
