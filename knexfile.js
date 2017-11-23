require("dotenv").config();
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT
    },

    migrations: {
      directory: "./migrations"
    },

    seeds: {
      directory: "./seeds"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      // database: process.env.DB_DATABASE,
      database:
        "postgres://obycioxcejlrbh:065f7a8d7ccd0f7fd44e42c4b56b2473195dd04c7a6c2bb83e33f24fdddc78ff@ec2-54-221-207-138.compute-1.amazonaws.com:5432/db5d1nana0t8v6",
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    }
    // migrations: {
    //   tableName: 'knex_migrations'
    // }
  }
};
