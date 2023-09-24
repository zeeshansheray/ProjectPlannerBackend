const Joi = require("joi");

const Signup = Joi.object({
    fullName : Joi.string().required(),
    email    : Joi.string().email().required(),
    password : Joi.string().min(8).required(),
    phone    : Joi.string().required(),
    role     : Joi.number().min(1).max(3)
})

const Login = Joi.object({
    email   : Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    type    : Joi.number().required(),
})

const SendEmail = Joi.object({
    email  : Joi.string().email().required(),
    code   : Joi.number(),
})

const ForgotPassword = Joi.object({
    email  : Joi.string().email().required(),
    password   : Joi.string().min(8).required(),
}) 

const UpdateUser = Joi.object({
    fullName   : Joi.string(),
    email      : Joi.string().email(),
    storeName  : Joi.string().allow(''),
    password   : Joi.string().min(8),
    phone      : Joi.string(),
    image      : Joi.string().allow(''),
    avatar     : Joi.string(),
    location   : Joi.object(),
    isRemoved  : Joi.boolean(),
    delete     : Joi.boolean(),
    description: Joi.string().allow(''),
    role       : Joi.number().min(1).max(3)
})

const GetUser = Joi.object({
    userId: Joi.string().required()
})



module.exports = {
    Signup,
    Login,
    GetUser,
    SendEmail,
    ForgotPassword,
    UpdateUser
}