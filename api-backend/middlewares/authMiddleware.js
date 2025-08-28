const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

exports.authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        // console.log(token)
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '2h' });
        req.user = await userModel.findById(decoded.id).select('-password'); // Attach user to request
        next();
    } catch (error) {
        res.status(401).json({
            error: 'Invalid token',
            details: error.message,
        })
    }
};
