'use strict'

const Model = use('Model')

class Student extends Model {

    
    subject() {
        return this.belongsToMany('App/Models/Subject')
                   .pivotTable('student_subjects')
    }
}

module.exports = Student
