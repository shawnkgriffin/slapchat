exports.seed = function(knex, Promise) {
  return knex("circles")
    .del()
    .then(() => {
      return Promise.all([
        knex("layers").select("id"),
        knex("users").select("id")
      ]);
    })
    .then(function(queryResult) {
      return Promise.all([
        knex("circles").insert({
          layer_id: queryResult[0][0].id,
          owner_user_id: queryResult[1][0].id,
          lat: 50.097348787126485,
          lng: -122.97210842370987,
          radius: 838.8350029285286,
          draggable: true,
          label: "Danger",
          description: "Fire in residence, do not approach."
        })
      ]);
    });
};
