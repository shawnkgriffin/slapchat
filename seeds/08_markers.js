exports.seed = function(knex, Promise) {
  return knex("markers")
    .del()
    .then(() => {
      return Promise.all([
        knex("layers").select("id"),
        knex("users").select("id")
      ]);
    })
    .then(function(queryResult) {
      return Promise.all([
        knex("markers").insert({
          layer_id: queryResult[0][0].id,
          owner_user_id: queryResult[1][0].id,
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05,
          draggable: true,
          label: "Accidents",
          icon: "http://localhost:3001/avalanche1.png"
        }),
        knex("markers").insert({
          layer_id: queryResult[0][1].id,
          owner_user_id: queryResult[1][1].id,
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05,
          label: "Items Needing Repair",
          draggable: true,
          icon: "http://localhost:3001/school.png"
        }),
        knex("markers").insert({
          layer_id: queryResult[0][2].id,
          owner_user_id: queryResult[1][2].id,
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05,
          draggable: true,
          label: "Sasquatch",
          icon: "http://localhost:3001/avalanche1.png"
        })
      ]);
    });
};
