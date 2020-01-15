'use strict'

const Model = use('Model')

class Subject extends Model {

    student() {
        return this.belongsToMany('App/Models/Student');
    }

    teacher() {
        return this.belongsTo('App/Models/Teacher')
    }
}

module.exports = Subject
