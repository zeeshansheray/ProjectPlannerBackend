const { ResponseStatus }   = require("../../_enums/enums")
const { ProjectService, UpdateProjectService, GetProjectService, GetAllProductService, DeleteProductService, UploadService } = require('./services')
const Responses                       = require('./responses')
const { projectVld } = require("../../_validations")
const { ValidationHandler } = require("../../_utils/handler")

const AddProject = async (req, res) => {

    const {invalid, value} = ValidationHandler(projectVld.Project, req.body, res)

    if(invalid) return invalid()

    const result = await ProjectService(value)

    return res.status(ResponseStatus.SUCCESS).send(result)
}


const UpdateProjectCntrl = async (req, res) => {

    const {invalid, value} = ValidationHandler(projectVld.UpdateProject, req.body, res)

    if(invalid) return invalid()

    const result = await UpdateProjectService(value)

    return res.status(ResponseStatus.SUCCESS).send(result)
}


const GetProjectCtrl = async (req, res) => {

    const {invalid, value} = ValidationHandler(projectVld.GetProject, req.query, res)

    if(invalid) return invalid()

    const result = await GetProjectService(value)

    return res.status(ResponseStatus.SUCCESS).send(result)
}


const GetAllProductCtrl = async (req, res) => {

    const result = await GetAllProductService()

    return res.status(ResponseStatus.SUCCESS).send(result)
}


const DeleteProductCtrl = async (req, res) => {

    const {invalid, value} = ValidationHandler(projectVld.DeleteProduct, req.body, res)

    if(invalid) return invalid()

    const result = await DeleteProductService(value)

    return res.status(ResponseStatus.SUCCESS).send(result)
}



module.exports = {
    AddProject,
    GetProjectCtrl,
    GetAllProductCtrl,
    UpdateProjectCntrl,
    DeleteProductCtrl
}