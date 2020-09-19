import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Orders', table => {
    table.increments('id').primary();
    table.string('description', 150).notNullable();
    table.integer('quantity').nullable();
    table.decimal('price', 10, 2).nullable();

    table.integer('userId').notNullable();
    table
      .dateTime('createdDate')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime('updatedDate')
      .notNullable()
      .defaultTo(knex.fn.now());

    table
      .foreign('userId')
      .references('id')
      .inTable('User');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('Orders');
}
