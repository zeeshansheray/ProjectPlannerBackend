const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
    name       : { type: String, required: true },
    description: { type: String, required: true },
    githubUrl: { type: String, required: true },
    liveUrl: { type: String, required: true },
    techStacks: { type: Array, required: true },
    startDate: { type: Number, required: true },
    completed: { type: Number },
    archived: { type: Boolean, required: true, default : false },
    image     : { type: Object, required: true },
    createdBy  : { type: String, required: true },
    delete     : { type: Boolean, required: true, default: false },
    created    : { type: Number, default: Date.now() },
    modified   : { type: Number, default: Date.now() }
})

module.exports = model('Project', ProductSchema)