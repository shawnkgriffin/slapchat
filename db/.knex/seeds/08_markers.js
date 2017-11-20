exports.seed = function(knex, Promise) {
  return knex("user_channels")
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
            location: "(50.089577, -122.931307 )",
            label: "Accidents",
            icon: "http://localhost:3001/avalanche1.png",
          }),
          knex("markers").insert({
            layer_id: queryResult[0][1].id,
            owner_user_id: queryResult[1][1].id,
            location: "(50.074817, -122.9369727)",
            label: "Items Needing Repair",
            icon: "http://localhost:3001/school.png",
          }),
          knex("markers").insert({
            layer_id: queryResult[0][2].id,
            owner_user_id: queryResult[1][2].id,
            location: "(50.097066, -122.953452)",
            label: "Sasquatch",
            icon: "http://localhost:3001/avalanche1.png",
          })
        ]);
    })
}
