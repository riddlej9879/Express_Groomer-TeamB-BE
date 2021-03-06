exports.up = async (knex) => {
  await knex.schema.createTable('groomer', (table) => {
    table.increments('id');
    table.string('user_id').unique().references('id').inTable('profiles');
    table.string('business_name');
    table.string('given_name').notNull();
    table.string('family_name').notNull();
    table.varchar('phone_number').notNull();
    table.varchar('address').notNull();
    table.varchar('city').notNull();
    table.varchar('state').notNull();
    table.varchar('zip_code').notNull();
    table.varchar('country').notNull();
    table.varchar('email').notNull();
    table.varchar('about', 5000);
    table.varchar('hours', 5000);
  });
  await knex.schema.createTable('customer', (table) => {
    table.increments('id');
    table.string('user_id').unique().references('id').inTable('profiles');
    table.string('given_name').notNull();
    table.string('family_name').notNull();
    table.varchar('phone_number').notNull();
    table.varchar('address');
    table.varchar('city');
    table.varchar('state');
    table.varchar('zip_code');
    table.varchar('country');
  });
  await knex.schema.createTable('pet_types', (table) => {
    table.increments('id');
    table.varchar('breed');
  });
  await knex.schema.createTable('pets', (table) => {
    table.increments('id');
    table.bigint('pet_types_id').references('id').inTable('pet_types');
    table.string('customer_id').references('user_id').inTable('customer');
    table.varchar('pet_name').notNull();
    table.varchar('pet_picture');
    table.varchar('pet_color');
    table.varchar('pet_gender').notNull();
    table.boolean('spay_neuter').notNull();
    table.varchar('special_requests', 5000);
    table.varchar('pet_temperment', 500);
    table.boolean('shots_current').notNull();
  });
  await knex.schema.createTable('services', (table) => {
    table.increments('id');
    table.string('service_name').notNull();
  });
  await knex.schema.createTable('groomer_services', (table) => {
    table.string('groomer_id').references('user_id').inTable('groomer');
    table.bigint('services_id').references('id').inTable('services');
    table.decimal('services_price', 14, 2);
  });
  await knex.schema.createTable('customer_pets_type', (table) => {
    table.string('customer_id').references('user_id').inTable('customer');
    table.bigint('pets_id').references('id').inTable('pets');
  });
  await knex.schema.createTable('groomer_schedule', (table) => {
    table.increments('id');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('customer_pets_type');
  await knex.schema.dropTableIfExists('groomer_services');
  await knex.schema.dropTableIfExists('groomer_schedule');
  await knex.schema.dropTableIfExists('services');
  await knex.schema.dropTableIfExists('pets');
  await knex.schema.dropTableIfExists('pet_types');
  await knex.schema.dropTableIfExists('customer');
  await knex.schema.dropTableIfExists('groomer');
};
