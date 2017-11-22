exports.up = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("users")
    .createTable("users", function(table) {
      table.increments("id").primary();
      table.string("first_name");
      table.string("last_name");
      table.string("display_name");
      table.string("email");
      table.string("password");
      table.string("avatar");
      table.string("location");
      table.timestamps(true, true);
    })
    .createTable("layers", function(table) {
      table.increments("id").primary();
      table.string("layer_name");
      table.timestamps(true, true);
    })
    .createTable("markers", function(table) {
      table.increments("id").primary();
      table
        .integer("layer_id")
        .references("id")
        .inTable("layers")
        .onDelete("CASCADE");
      table
        .integer("owner_user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("location");
      table.string("label");
      table.string("icon");
      table.boolean("draggable");
      table.timestamps(true, true);
    })
    .createTable("channels", function(table) {
      table.increments("id").primary();
      table.string("name");
      table.boolean("private");
      table.timestamps(true, true);
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
      table.timestamps(true, true);
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
      table.timestamps(true, true);
    })
    .createTable("location_data", function(table) {
      table.increments("id").primary();
      table
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("location");
      table.timestamps(true, true);
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
      table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("markers")
    .dropTable("layers")
    .dropTable("user_channels")
    .dropTable("location_data")
    .dropTable("channel_messages")
    .dropTable("direct_messages")
    .dropTable("channels")
    .dropTable("users");
};
