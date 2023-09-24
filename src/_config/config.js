const { ENV, ResponseStatus } = require("../_enums/enums")

const env = {
    port         : 8080,
    corsOption   : '',
    mongodb_uri  : 'mongodb+srv://zeeshansheray:8mht3m0wQjVUTEFx@cluster0.szerwi3.mongodb.net/y',
}

if(process.env.NODE_ENV === ENV.DEVELOPMENT){
    const corsOption = {
        origin                  : '*',
        methods                 : 'GET,HEAD,PUT,PATCH,POST,DELETE',
        optionsSuccessStatus    : ResponseStatus.SUCCESS
    }

    env.corsOption = corsOption
    env.mongodb_uri = env.mongodb_uri
    
}

if(process.env.NODE_ENV === ENV.PRODUCTION){
    const whitelistDomains = []
    function Origin (origin, callback) {
        console.log(origin);
        if (whitelistDomains.indexOf(origin) !== -1 || !origin) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
    }
    const corsOption = {
        origin                  : Origin,
        methods                 : 'GET,HEAD,PUT,PATCH,POST,DELETE',
        optionsSuccessStatus    : ResponseStatus.SUCCESS
    }
}

module.exports = env