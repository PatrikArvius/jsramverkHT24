const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = process.env.JWT_SECRET;
const User = require('../models/userModel');

async function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];

    try {
        const { email } = jwt.verify(token, secret);
        req.user = await User.findOne({ email });
        next();
    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: 'Failed authentication',
            detal: error.message,
        });
    }
}

async function getToken(res, password, user) {
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                title: 'Bcrypt error',
                source: '/login',
                detail: err.message,
            });
        } else if (result) {
            const payload = { email: user.email };
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });

            return res.status(200).json({
                status: 200,
                title: 'Logged in',
                message: `${user.email} logged in and received token`,
                email: user.email,
                token: token,
            });
        }

        return res.status(401).json({
            status: 401,
            title: 'Login failed',
            source: '/login',
            message: 'The provided password was incorrect',
        });
    });
}

module.exports = { verifyToken, getToken };
