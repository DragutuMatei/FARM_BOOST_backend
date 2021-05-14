const {
    verify
} = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.header('accessToken');

    if (accessToken) {
        try {
            const validToke = verify(accessToken, process.env.SECRET);

            req.user = validToke;

            if (validToke) {
                return next();
            }

        } catch (error) {
            return res.json({
                ok: false
            })
        }
    } else {
        return res.json({
            ok: false
        })
    }
}

module.exports = {
    validateToken
}