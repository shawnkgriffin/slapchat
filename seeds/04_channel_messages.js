exports.seed = function(knex, Promise) {
  return knex("channel_messages")
    .del()
    .then(() => {
      return Promise.all([ 
         knex("users").select("id"),
         knex("channels").select("id")
      ])
    })
    .then(function(queryResult) {
      return Promise.all([
        knex("channel_messages").insert({
          sender_user_id: queryResult[0][0].id,
          channel_id: queryResult[1][0].id,
          content: "This is a channel message"
        })
      ]);
    });
};
