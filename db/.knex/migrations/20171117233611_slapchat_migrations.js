exports.up = function(knex, Promise) {
    return knex.schema.dropTableIfExists("users")
      .createTable("users", function(table) {
        table.increments("id").primary();
        table.string("first_name");
        table.string("last_name");
        table.string("display_name");
        table.string("email");
        table.string("avatar");
      })
      .createTable("channels", function(table) {
        table.increments("id").primary();
        table.string("name");
        table.boolean("private");
      })
      .createTable("direct_messages", function(table) {
        table.increments("id").primary();
        table
          .integer("sender_user_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
        table
          .integer("recipient_user_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
        table.string("content");
      })
      .createTable("channel_messages", function(table) {
        table.increments("id").primary();
        table
          .integer("sender_user_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
        table
          .integer("channel_id")
          .references("id")
          .inTable("channels")
          .onDelete("CASCADE");
        table.string("content");
      })
      .createTable("location_data", function(table) {
        table.increments("id").primary();
        table
          .integer("user_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
        table.string("location");
      })
      .createTable("user_channels", function(table) {
        table.increments("id").primary();
        table
          .integer("user_id")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
        table
          .integer("channel_id")
          .references("id")
          .inTable("channels")
          .onDelete("CASCADE");
      });
  
};

exports.down = function(knex, Promise) {
    return knex.schema
       .dropTable("user_channels")
       .dropTable("location_data")
       .dropTable("channel_messages")
       .dropTable("direct_messages")
       .dropTable("channels")
       .dropTable("users");
};
