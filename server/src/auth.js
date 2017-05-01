const basicAuth = require('basic-auth');
const validUser = require('./../../user.json');

const auth = (req, res, next) => {
    const unauthorized = res => {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
    };

    const user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    if (user.name === validUser.name && user.pass === validUser.password) {
        return next();
    } else {
        return unauthorized(res);
    }
};

module.exports.auth = auth;
