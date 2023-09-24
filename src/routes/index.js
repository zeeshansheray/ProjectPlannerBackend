const middleware = process.env.NODE_ENV === 'production' ? '/v1/' : '/api/v1/'
const Auth      = require("./auth/routes")
const Project   = require("./project/routes")


const initializeEndpoints = (app) => {
    app.use(middleware + 'auth', Auth)
    app.use(middleware + 'project', Project)
};

module.exports = initializeEndpoints;
