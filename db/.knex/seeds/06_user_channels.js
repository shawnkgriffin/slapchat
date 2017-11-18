exports.seed = function(knex, Promise) {
  return knex("user_channels")
    .del()
    .then(() => {
      return Promise.all([
        knex("users").select("id"),
        knex("channels").select("id")
      ]);
    })
    .then(function(queryResult) {
      return Promise.all([
        knex("user_channels").insert({
          user_id: queryResult[0][0].id,
          channel_id: queryResult[1][2].id,
        })
      ]);
    });
};
