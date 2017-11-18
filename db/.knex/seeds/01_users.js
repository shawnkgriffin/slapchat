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
          avatar: "https://avatars3.githubusercontent.com/u/8441361?s=40&v=4"
        }),
         knex("users").insert({
          first_name: "Scott",
          last_name: "Scotty",
          display_name: "Scotty2Hottie",
          email: "scott@scott.scott",
          avatar: "https://www.dropbox.com/s/4pon02x9ufsbfgi/scott.jpg?dl=1"
        }),
        knex("users").insert({
         first_name: "Jessica",
         last_name: "Jones",
         display_name: "JJ Abrams",
         email: "jess@jess.jess",
         avatar: "https://www.dropbox.com/s/o49uwc0hibhdmhe/Jessica.jpg?dl=1"
       }),
        knex("users").insert({
         first_name: "Tony",
         last_name: "Alfredo",
         display_name: "Mario",
         email: "tony@tony.tony",
         avatar: "https://www.dropbox.com/s/xbgayosa4jekst8/tony.png?dl=1"
       }),
        knex("users").insert({
         first_name: "Bob",
         last_name: "Loblaw",
         display_name: "Bob@Law",
         email: "bob@bob.bob",
         avatar: "https://www.dropbox.com/s/rtf0q8vraxhejql/bob.jpg?dl=1"
       }),
        knex("users").insert({
          first_name: "Finn",
          last_name: "Hiltner",
          display_name: "Nick Cave",
          email: "finn@finn.finn",
          avatar: "https://www.dropbox.com/s/t63rr2yisnz4pdf/finn.png?dl=1"
        }),
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
          avatar: "https://goo.gl/images/ws9h25"
        }),
      ]);
    });
};
