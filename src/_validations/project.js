const Joi = require("joi");

const Project = Joi.object({
    name       : Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    createdBy  : Joi.string().required(),
    delete   : Joi.boolean(),
    startDate   : Joi.string().required(),
    githubUrl : Joi.string().required(),
    liveUrl : Joi.string().required(),
    techStacks: Joi.array().required(),
    completed: Joi.number().allow(''),
    archived   : Joi.boolean().default(false),
})


const UpdateProject = Joi.object({
    _id        : Joi.string().required(),
    name       : Joi.string(),
    createdBy  : Joi.string(),
    name       : Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    createdBy  : Joi.string(),
    delete   : Joi.boolean(),
    startDate   : Joi.string(),
    githubUrl : Joi.string(),
    liveUrl : Joi.string(),
    techStacks: Joi.array(),
    completed: Joi.number().allow(''),
    archived   : Joi.boolean().default(false),
})


const DeleteProject = Joi.object({
    _id             : Joi.string().required(),
})


const GetProject = Joi.object({
    _id      : Joi.string(),
    createdBy: Joi.string(),
    delete   : false,
})




module.exports = {
    Project,
    UpdateProject,
    DeleteProject,
    GetProject
}