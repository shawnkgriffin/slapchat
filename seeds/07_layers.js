exports.seed = function(knex, Promise) {
  return knex("layers")
    .del()
    .then(function() {
      return Promise.all([
        knex("layers").insert({
          layer_name: "Accidents"
        }),
        knex("layers").insert({
          layer_name: "Items Needing Repair"
        }),
        knex("layers").insert({
          layer_name: "Sasquatch"
        })
      ]);
    });
};
