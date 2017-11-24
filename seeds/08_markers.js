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
          label: "Avalanche danger",
          description: "Patrol has determined high risk of avalanche.",
          icon: "/avalanche1.png"
        }),
        knex("markers").insert({
          layer_id: queryResult[0][1].id,
          owner_user_id: queryResult[1][1].id,
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05,
          label: "Junior",
          description: "Junior ski school meeting point. Ages 9-11.",
          draggable: true,
          icon: "/school.png"
        }),
        knex("markers").insert({
          layer_id: queryResult[0][2].id,
          owner_user_id: queryResult[1][2].id,
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05,
          draggable: true,
          label: "Fire",
          description: "Bush fire, under control.",
          icon: "/fire.png"
        })
      ]);
    });
};
