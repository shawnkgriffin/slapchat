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
          location:"(50.11528441138468, -122.9272109117575)",
        }),
        knex("location_data").insert({
          user_id: queryResult[1].id,
          location:"(50.1133362564326, -122.91468101741026)",
        }),
        knex("location_data").insert({
          user_id: queryResult[2].id,
          location:"(50.11198764488344, -122.92159079945013)",
        }),
        knex("location_data").insert({
          user_id: queryResult[3].id,
          location:"(50.095655337414236, -122.89925413788879)",
        }),
        knex("location_data").insert({
          user_id: queryResult[4].id,
          location:"(50.106355374239335, -122.92235216122272)",
        }),
        knex("location_data").insert({
          user_id: queryResult[5].id,
          location:"(50.09837765839853, -122.92397760821027)",
        }),
        knex("location_data").insert({
          user_id: queryResult[6].id,
          location:"(50.123270188658665, -122.91294340973344)",
        }),
        knex("location_data").insert({
          user_id: queryResult[7].id,
          location:"(50.11844447745653, -122.92434657073115)",
        })
      ]);
    });
};
