const express = require('express')
const router = express.Router()

const { ReqMethods } = require('../../_enums/enums')

const controllers = require('./controllers')

const { ApiErrorHandler } = require('../../_utils/handler')
const { Authenticate, CheckAdmin } = require('../../lib/auth/auth.services')

const Route = () => {
    const routes = [
        {
            method      : ReqMethods.POST,
            url         : '/',
            middlewares : [Authenticate, CheckAdmin],
            fn          : ApiErrorHandler(controllers.AddProject)
        },
        {
            method      : ReqMethods.GET,
            url         : '/',
            middlewares : [],
            fn          : ApiErrorHandler(controllers.GetProjectCtrl)
        },
        {
            method      : ReqMethods.PUT,
            url         : '/',
            middlewares : [Authenticate, CheckAdmin],
            fn          : ApiErrorHandler(controllers.UpdateProjectCntrl)
        },
        {
            method      : ReqMethods.GET,
            url         : '/all',
            middlewares : [],
            fn          : ApiErrorHandler(controllers.GetAllProductCtrl)
        },
        {
            method      : ReqMethods.POST,
            url         : '/delete',
            middlewares : [Authenticate, CheckAdmin],
            fn          : ApiErrorHandler(controllers.DeleteProductCtrl)
        },
    ]

    for (var route of routes) {
        const { method, url, middlewares, fn } = route
        
        router[method](url, ...middlewares, fn)
    }

    return router
}

module.exports = Route()