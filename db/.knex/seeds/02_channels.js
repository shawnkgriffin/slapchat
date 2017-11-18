exports.seed = function(knex, Promise) {
  return knex("channels")
    .del()
    .then(function() {
      return Promise.all([
        knex("channels").insert({
          name: "Ski Patrol",
          private: true
        }),
        knex("channels").insert({
          name: "Maintenance",
          private: false
        }),
        knex("channels").insert({
          name: "Instructors",
          private: false
        })
      ]);
    });
};
