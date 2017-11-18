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
          location:"(25.1212, 55.1535)",
        })
      ]);
    });
};
