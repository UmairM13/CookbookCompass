const foods = require("../models/food.server.models");

const get_food = (req, res) => {
  let q = req.query.q;

  foods.getFood(q, (err, recipes) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
    console.log("recipes");
    console.log(recipes);
    return res.status(200).send(recipes);
  });
};

module.exports = {
  get_food,
};
