const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers['authorization'].replace('Bearer', '').trim();

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId
       
        
    } catch (error) {
         res.status(401).json({error: 'Authentication Failed'})
    }
    next()
};

module.exports = authMiddleware;