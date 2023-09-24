const { Schema, model } = require('mongoose')
const { UserTypes } = require('../_enums/enums')

const UserSchema = new Schema({
    fullName   : { type: String, required: true, trim: true },
    email      : { type: String, required: true, trim: true, unique: true },
    password   : { type: String, required: true },
    phone      : { type: String, required: true },
    types      : { type: Array, required: true, default: UserTypes.ADMIN },
    verified   : { type: Boolean, default: true},
    created    : { type: Number, default: Date.now() },
    modified   : { type: Number, default: Date.now() },
    delete     : { type: Boolean, required: true, default: false },
})

module.exports = model('User', UserSchema)