exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return Promise.all([
        knex("users").insert({
          first_name: "Shawn",
          last_name: "Griffin",
          display_name: "Dispatch",
          lat: 50.12104091740683,
          lng: -122.96314169311529,
          email: "shawn@shawngriffin.com",
          password: "test",
          avatar: "/avatars/shawn.jpg"
        }),
        knex("users").insert({
          first_name: "Scott",
          last_name: "Scotty",
          display_name: "Scotty",
          email: "scott@scott.scott",
          password: "test",
          lat: 50.09718756539246,
          lng: -122.96753942871095,
          avatar: "/avatars/scott.jpg"
        }),
        knex("users").insert({
          first_name: "Jessica",
          last_name: "Jones",
          display_name: "Jessie",
          lat: 50.1182,
          lng: -122.911,
          email: "jess@jess.jess",
          password: "test",
          avatar: "/avatars/Jessica.jpg"
        }),
        knex("users").insert({
          first_name: "Anthony",
          last_name: "Soprano",
          display_name: "Tony",
          lat: 50.07707784082589,
          lng: -122.89853970336912,
          email: "tony@tony.tony",
          password: "test",
          avatar: "/avatars/tony.png"
        }),
        knex("users").insert({
          first_name: "Bob",
          last_name: "Maintien",
          display_name: "Bob",
          lat: 50.0671,
          lng: -122.927,
          email: "bob@bob.bob",
          password: "test",
          avatar: "/avatars/bob.jpg"
        }),
        knex("users").insert({
          first_name: "Finn",
          last_name: "Hiltner",
          display_name: "Finny",
          lat: 50.0781,
          lng: -122.917,
          email: "finn@finn.finn",
          password: "test",
          avatar: "/avatars/finn.png"
        }),
        knex("users").insert({
          first_name: "Greg",
          last_name: "Sugiyama",
          display_name: "Greg",
          lat: 50.07315,
          lng: -122.97082,
          email: "greg@greg.greg",
          password: "test",
          avatar: "/avatars/greg.jpg"
        }),
        knex("users").insert({
          first_name: "Travis",
          last_name: "Kothlow",
          display_name: "Trav",
          lat: 50.0877,
          lng: -122.93,
          email: "travis@travis.travis",
          password: "test",
          avatar: "/avatars/travis.jpg"
        }),
        knex("users").insert({
          first_name: "BB",
          last_name: "8",
          display_name: "BB8",
          lat: 50.1001,
          lng: -122.939,
          password: "test",
          email: "bb8@starwars.com",
          avatar: "/avatars/bb8.png"
        })
      ]);
    });
};
