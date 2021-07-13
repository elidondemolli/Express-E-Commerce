const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log(decoded)

        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
}