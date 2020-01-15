'use strict'

const Model = use('Model')

class Address extends Model {
    student() {
        return this.belongsTo('App/Models/Student')
    }
}

module.exports = Address
