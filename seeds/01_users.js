exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return Promise.all([
        knex("users").insert({
          first_name: "Shawn",
          last_name: "Griffin",
          display_name: "Dispatch",
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05,
          email: "shawn@shawngriffin.com",
          password: "test",
          avatar: "http://localhost:3001/avatars/shawn.jpg"
        }),
        knex("users").insert({
          first_name: "Scott",
          last_name: "Scotty",
          display_name: "Scotty",
          email: "scott@scott.scott",
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05,
          avatar: "http://localhost:3001/avatars/scott.jpg"
        }),
        knex("users").insert({
          first_name: "Jessica",
          last_name: "Jones",
          display_name: "Jessie",
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05,
          email: "jess@jess.jess",
          password: "test",
          avatar: "http://localhost:3001/avatars/Jessica.jpg"
        }),
        knex("users").insert({
          first_name: "Anthony",
          last_name: "Soprano",
          display_name: "Tony",
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05,
          email: "tony@tony.tony",
          password: "test",
          avatar: "http://localhost:3001/avatars/tony.png"
        }),
        knex("users").insert({
          first_name: "Bob",
          last_name: "Maintien",
          display_name: "Bob",
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05,
          email: "bob@bob.bob",
          password: "test",
          avatar: "http://localhost:3001/avatars/bob.jpg"
        }),
        knex("users").insert({
          first_name: "Finn",
          last_name: "Hiltner",
          display_name: "Finny",
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05,
          email: "finn@finn.finn",
          password: "test",
          avatar: "http://localhost:3001/avatars/finn.png"
        }),
        knex("users").insert({
          first_name: "Greg",
          last_name: "Sugiyama",
          display_name: "Greg",
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05,
          email: "greg@greg.greg",
          password: "test",
          avatar: "http://localhost:3001/avatars/greg.jpg"
        }),
        knex("users").insert({
          first_name: "Travis",
          last_name: "Kothlow",
          display_name: "Trav",
          lat: 50.093284 + (Math.random() - 0.5) * 0.05,
          lng: -122.93494 + (Math.random() - 0.5) * 0.05,
          email: "travis@travis.travis",
          password: "test",
          avatar: "http://localhost:3001/avatars/travis.jpg"
        })
      ]);
    });
};
