exports.up = async (knex) => {
  await knex.schema
    .createTable('recipes', (recipes) => {
      recipes.increments('recipe_id')
      recipes.string('title', 200).unique().notNullable()
      recipes.string('source', 200).notNullable()
    })
    .createTable('instructions', (instructions) => {
      instructions.increments('instruction_id')
      instructions.integer('instruction_step').unsigned().notNullable()
      instructions.string('instruction_name').notNullable()
      instructions.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipe_id')
        .inTable('recipes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
    .createTable('ingredients', (ingredients) => {
      ingredients.increments('ingredient_id')
      ingredients.string('ingredient_name').notNullable()
    })
    .createTable('category', (category) => {
      category.increments('category_id')
      category.string('category_name').notNullable()
    })
    .createTable('recipe_ingredients', (recipe_ingredients) => {
      recipe_ingredients.increments()
      recipe_ingredients.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipe_id')
        .inTable('recipes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      recipe_ingredients.integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredient_id')
        .inTable('ingredients')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
    .createTable('recipe_categories', (recipe_categories) => {
      recipe_categories.increments()
      recipe_categories.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipe_id')
        .inTable('recipes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      recipe_categories.integer('category_id')
        .unsigned()
        .notNullable()
        .references('category_id')
        .inTable('category')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
};

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('recipe_categories')
    .dropTableIfExists('recipe_ingredients')
    .dropTableIfExists('category')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('instructions')
    .dropTableIfExists('recipes')
};
