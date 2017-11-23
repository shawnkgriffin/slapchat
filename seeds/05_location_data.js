exports.seed = function(knex, Promise) {
  return knex("location_data")
    .del()
    .then(() => {
      return knex("users").select("id");
    })
    .then(function(queryResult) {
      return Promise.all([
        knex("location_data").insert({
          user_id: queryResult[0].id,
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05
        }),
        knex("location_data").insert({
          user_id: queryResult[1].id,
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05
        }),
        knex("location_data").insert({
          user_id: queryResult[2].id,
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05
        }),
        knex("location_data").insert({
          user_id: queryResult[3].id,
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05
        }),
        knex("location_data").insert({
          user_id: queryResult[4].id,
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05
        }),
        knex("location_data").insert({
          user_id: queryResult[5].id,
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05
        }),
        knex("location_data").insert({
          user_id: queryResult[6].id,
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05
        }),
        knex("location_data").insert({
          user_id: queryResult[7].id,
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05
        })
      ]);
    });
};
