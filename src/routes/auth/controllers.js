const { ResponseStatus, UserTypes }   = require("../../_enums/enums")
const { userVld }                     = require("../../_validations")
const { SignUpService, LoginService, SendEmailService, ForgotPasswordService, UpdateUserService, GetUserService } = require('./services')
const Responses                       = require('./responses')
const { getUniqueId }                 = require("../../_utils/utils")
const { generatePassHash }            = require("../../_utils/guard")
const { ValidationHandler }          = require('../../_utils/handler')

const SignUpCtrl = async (req, res) => {

    const {invalid, value} = ValidationHandler(userVld.Signup, req.body, res)

    if(invalid) return invalid()

    const user = {
        uuid        : getUniqueId(16),
        email       : value.email,
        fullName    : value.fullName,
        phone       : value.phone,
        avatar      : value.avatar,
        password    : generatePassHash(value.password),
        types       : [UserTypes.CUSTOMER]
    }

    if(value.role) user.types.push(value.role) 

    const result = await SignUpService(user)

    return res.status(ResponseStatus.SUCCESS).send(result)
}

const LoginCtrl = async (req, res) => {
    console.log('here')
    const { invalid, value } = ValidationHandler(userVld.Login, req.body, res)

    if(invalid) return invalid()

    const result = await LoginService(value)

    if(!result.success)
    return res.status(ResponseStatus.BAD_REQUEST).send(result)

    return res.status(ResponseStatus.SUCCESS).send(result)

}

const SendEmail = async (req, res) => {
    const { invalid, value } = ValidationHandler(userVld.SendEmail, req.body, res)

    if(invalid) return invalid()

    const result = await SendEmailService(value)

    if(!result.success)
    return res.status(ResponseStatus.BAD_REQUEST).send(result)

    return res.status(ResponseStatus.SUCCESS).send(result)

}

const changePassword = async (req, res) => {
    const { invalid, value } = ValidationHandler(userVld.ForgotPassword, req.body, res)

    if(invalid) return invalid()

    const result = await ForgotPasswordService(value)

    if(!result.success)
    return res.status(ResponseStatus.BAD_REQUEST).send(result)

    return res.status(ResponseStatus.SUCCESS).send(result)

}

const UpdateUser = async (req, res) => {
    const { invalid, value } = ValidationHandler(userVld.UpdateUser, req.body, res)


    if(invalid) return invalid()


    const result = await UpdateUserService(value)

    if(!result.success)
    return res.status(ResponseStatus.BAD_REQUEST).send(result)

    return res.status(ResponseStatus.SUCCESS).send(result)

}

const GetUser = async (req, res) => {

    const result = await GetUserService(req.query)

    if(!result.success)
    return res.status(ResponseStatus.BAD_REQUEST).send(result)

    return res.status(ResponseStatus.SUCCESS).send(result)

}



module.exports = {
    SignUpCtrl,
    LoginCtrl,
    SendEmail,
    changePassword,
    UpdateUser,
    GetUser
}