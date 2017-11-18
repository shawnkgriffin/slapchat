exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return Promise.all([
        knex("users").insert({
          first_name: "Greg",
          last_name: "Sugiyama",
          display_name: "Big Papa",
          email: "greg@greg.greg",
          avatar: "https://avatars2.githubusercontent.com/u/27904153?s=460&v=4"
        }),
        knex("users").insert({
          first_name: "Travis",
          last_name: "Kothlow",
          display_name: "Debarge",
          email: "travis@travis.travis",
          avatar: "https://avatars0.githubusercontent.com/u/30641068?s=400&v=4"
        }),
        knex("users").insert({
          first_name: "Finn",
          last_name: "Hiltner",
          display_name: "Nick Cave",
          email: "finn@finn.finn",
          avatar: "https://www.dropbox.com/s/t63rr2yisnz4pdf/finn.png?dl=1"
        }),
        knex("users").insert({
          first_name: "Shawn",
          last_name: "Griffin",
          display_name: "Project Master",
          email: "shawn@shawn.shawn",
          avatar: "https://avatars3.githubusercontent.com/u/8441361?s=40&v=4"
        })
      ]);
    });
};
