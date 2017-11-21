exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return Promise.all([
        knex("users").insert({
          first_name: "Shawn",
          last_name: "Griffin",
          display_name: "Project Master",
          email: "shawn@shawn.shawn",
          avatar: "http://localhost:3001/avatars/shawn.jpg"
        }),
         knex("users").insert({
          first_name: "Scott",
          last_name: "Scotty",
          display_name: "Scotty2Hottie",
          email: "scott@scott.scott",
          avatar: "http://localhost:3001/avatars/scott.jpg"
        }),
        knex("users").insert({
         first_name: "Jessica",
         last_name: "Jones",
         display_name: "JJ Abrams",
         email: "jess@jess.jess",
         avatar: "http://localhost:3001/avatars/Jessica.jpg"
       }),
        knex("users").insert({
         first_name: "Tony",
         last_name: "Alfredo",
         display_name: "Mario",
         email: "tony@tony.tony",
         avatar: "http://localhost:3001/avatars/tony.png"
       }),
        knex("users").insert({
         first_name: "Bob",
         last_name: "Loblaw",
         display_name: "Bob@Law",
         email: "bob@bob.bob",
         avatar: "http://localhost:3001/avatars/bob.jpg"
       }),
        knex("users").insert({
          first_name: "Finn",
          last_name: "Hiltner",
          display_name: "Nick Cave",
          email: "finn@finn.finn",
          avatar: "http://localhost:3001/avatars/finn.png"
        }),
        knex("users").insert({
          first_name: "Greg",
          last_name: "Sugiyama",
          display_name: "Big Papa",
          email: "greg@greg.greg",
          avatar: "http://localhost:3001/avatars/greg.jpg"
        }),
        knex("users").insert({
          first_name: "Travis",
          last_name: "Kothlow",
          display_name: "Debarge",
          email: "travis@travis.travis",
          avatar: "http://localhost:3001/avatars/travis.jpg"
        }),
      ]);
    });
};
