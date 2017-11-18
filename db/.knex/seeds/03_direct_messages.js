exports.seed = function(knex, Promise) {
  return knex("direct_messages")
    .del()
    .then(() => {
      return knex("users").select("id");
    })
    .then(function(queryResult) {
      return Promise.all([
        knex("direct_messages").insert({
            sender_user_id: queryResult[0].id,
            recipient_user_id: queryResult[1].id,
            content: "This is a direct message"
        })
      ]);
    });
};
