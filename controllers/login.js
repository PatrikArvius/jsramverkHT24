const { getToken } = require('./authentication.js');
const User = require('../models/userModel.js');

async function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!(email && password)) {
        return res.status(401).json({
            status: 500,
            title: 'Login error',
            source: '/login',
            message: 'email or password is missing',
        });
    }

    try {
        const user = await User.findOne({ email: email }).exec();

        if (!user) {
            return res.status(404).json({ message: 'No user found with the provided email' });
        }
        getToken(res, password, user);
    } catch (e) {
        res.status(500).json({
            status: 500,
            type: 'post',
            source: '/',
            title: 'Database error',
            message: e.message,
        });
    }
}

module.exports = { loginUser };
