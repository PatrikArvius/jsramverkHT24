const { getToken } = require('./authentication.js');
const User = require('../models/userModel.js');

async function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!(email && password)) {
        return res.status(401).json({
            error: {
                status: 500,
                title: 'Login error',
                source: '/login',
                detail: 'email or password is missing',
            },
        });
    }

    try {
        const user = await User.findOne({ email: email }).exec();

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with the provided email' });
        }
        getToken(res, password, user);
    } catch (e) {
        res.status(500).json({
            error: {
                status: 500,
                type: 'post',
                source: '/',
                title: 'Database error',
                detail: e.message,
            },
        });
    }
}

module.exports = { loginUser };
