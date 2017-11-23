exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return Promise.all([
        knex("users").insert({
          first_name: "Shawn",
          last_name: "Griffin",
          display_name: "Dispatch",
          location: `(${50.093284 +
            (Math.random() - 0.5) * 0.05}, ${-122.93494 +
            (Math.random() - 0.5) * 0.05})`,
          email: "shawn@shawngriffin.com",
          password:
            "$2a$10$zzINBZ6fwhOtJWduwSRkcexHGZyuUkXTxGgHSSgsSwn6U4AdxMO.O",
          avatar: "http://localhost:3001/avatars/shawn.jpg"
        }),
        knex("users").insert({
          first_name: "Scott",
          last_name: "Scotty",
          display_name: "Scotty",
          email: "scott@scott.scott",
          location: `(${50.093284 +
            (Math.random() - 0.5) * 0.05}, ${-122.93494 +
            (Math.random() - 0.5) * 0.05})`,
          password:
            "$2a$10$zzINBZ6fwhOtJWduwSRkcexHGZyuUkXTxGgHSSgsSwn6U4AdxMO.O",
          avatar: "http://localhost:3001/avatars/scott.jpg"
        }),
        knex("users").insert({
          first_name: "Jessica",
          last_name: "Jones",
          display_name: "Jessie",
          location: `(${50.093284 +
            (Math.random() - 0.5) * 0.05}, ${-122.93494 +
            (Math.random() - 0.5) * 0.05})`,
          email: "jess@jess.jess",
          password:
            "$2a$10$zzINBZ6fwhOtJWduwSRkcexHGZyuUkXTxGgHSSgsSwn6U4AdxMO.O",
          avatar: "http://localhost:3001/avatars/Jessica.jpg"
        }),
        knex("users").insert({
          first_name: "Anthony",
          last_name: "Soprano",
          display_name: "Tony",
          location: `(${50.093284 +
            (Math.random() - 0.5) * 0.05}, ${-122.93494 +
            (Math.random() - 0.5) * 0.05})`,
          email: "tony@tony.tony",
          password:
            "$2a$10$zzINBZ6fwhOtJWduwSRkcexHGZyuUkXTxGgHSSgsSwn6U4AdxMO.O",
          avatar: "http://localhost:3001/avatars/tony.png"
        }),
        knex("users").insert({
          first_name: "Bob",
          last_name: "Maintien",
          display_name: "Bob",
          location: `(${50.093284 +
            (Math.random() - 0.5) * 0.05}, ${-122.93494 +
            (Math.random() - 0.5) * 0.05})`,
          email: "bob@bob.bob",
          password:
            "$2a$10$zzINBZ6fwhOtJWduwSRkcexHGZyuUkXTxGgHSSgsSwn6U4AdxMO.O",
          avatar: "http://localhost:3001/avatars/bob.jpg"
        }),
        knex("users").insert({
          first_name: "Finn",
          last_name: "Hiltner",
          display_name: "Finny",
          location: `(${50.093284 +
            (Math.random() - 0.5) * 0.05}, ${-122.93494 +
            (Math.random() - 0.5) * 0.05})`,
          email: "finn@finn.finn",
          password:
            "$2a$10$zzINBZ6fwhOtJWduwSRkcexHGZyuUkXTxGgHSSgsSwn6U4AdxMO.O",
          avatar: "http://localhost:3001/avatars/finn.png"
        }),
        knex("users").insert({
          first_name: "Greg",
          last_name: "Sugiyama",
          display_name: "Greg",
          location: `(${50.093284 +
            (Math.random() - 0.5) * 0.05}, ${-122.93494 +
            (Math.random() - 0.5) * 0.05})`,
          email: "greg@greg.greg",
          password:
            "$2a$10$zzINBZ6fwhOtJWduwSRkcexHGZyuUkXTxGgHSSgsSwn6U4AdxMO.O",
          avatar: "http://localhost:3001/avatars/greg.jpg"
        }),
        knex("users").insert({
          first_name: "Travis",
          last_name: "Kothlow",
          display_name: "Trav",
          location: `(${50.093284 +
            (Math.random() - 0.5) * 0.05}, ${-122.93494 +
            (Math.random() - 0.5) * 0.05})`,
          email: "travis@travis.travis",
          password:
            "$2a$10$zzINBZ6fwhOtJWduwSRkcexHGZyuUkXTxGgHSSgsSwn6U4AdxMO.O",
          avatar: "http://localhost:3001/avatars/travis.jpg"
        })
      ]);
    });
};
