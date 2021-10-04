const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { authSecret } = require('../.env');

module.exports = {
    validation: async function validateToken(req, res, next) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(400).json({
                erro: true,
                msg: "Necessário realizar o login para acessar esta página!"
            });
        }

        const [, token] = authHeader.split(' ');

        if (!token) {
            return res.status(400).json({
                erro: true,
                msg: "Necessário realizar o login para acessar esta página!"
            });
        }

        try {
            const decode = await promisify(jwt.verify)(token, authSecret);

            req.userId = decode.id;

            return next();
        } catch (err) {
            return res.status(400).json({
                erro: true,
                msg: "Necessário realizar o login para acessar esta página!"
            });
        }
    }
}