'use strict'

const Schema = use('Schema')

class SubjectSchema extends Schema {
  up () {
    this.create('subjects', (table) => {
      table.increments()
      table.string('name').notNullable();
      table
      .integer('teacher_id')
      .unsigned()
      .references('id')
      .inTable('teachers')
      .onUpdate('NO ACTION')
      .onDelete('SET NULL');
      table.timestamps()
    })
  }

  down () {
    this.drop('subjects')
  }
}

module.exports = SubjectSchema
