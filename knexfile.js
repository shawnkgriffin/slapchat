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
      database: process.env.DB_DATABASE,
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
