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
          channel_id: queryResult[1][0].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][0].id,
          channel_id: queryResult[1][1].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][0].id,
          channel_id: queryResult[1][2].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][1].id,
          channel_id: queryResult[1][0].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][1].id,
          channel_id: queryResult[1][1].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][1].id,
          channel_id: queryResult[1][2].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][2].id,
          channel_id: queryResult[1][0].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][2].id,
          channel_id: queryResult[1][1].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][2].id,
          channel_id: queryResult[1][2].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][3].id,
          channel_id: queryResult[1][0].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][3].id,
          channel_id: queryResult[1][1].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][3].id,
          channel_id: queryResult[1][2].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][4].id,
          channel_id: queryResult[1][0].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][4].id,
          channel_id: queryResult[1][1].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][4].id,
          channel_id: queryResult[1][2].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][5].id,
          channel_id: queryResult[1][0].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][5].id,
          channel_id: queryResult[1][1].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][5].id,
          channel_id: queryResult[1][2].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][6].id,
          channel_id: queryResult[1][0].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][6].id,
          channel_id: queryResult[1][1].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][6].id,
          channel_id: queryResult[1][2].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][7].id,
          channel_id: queryResult[1][0].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][7].id,
          channel_id: queryResult[1][1].id,
        }),
        knex("user_channels").insert({
          user_id: queryResult[0][7].id,
          channel_id: queryResult[1][2].id,
        }),
      ]);
    });
};
