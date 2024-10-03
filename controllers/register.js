const bcrypt = require('bcryptjs');
const User = require('../models/userModel.js');

async function registerUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!(email && password)) {
        return res.status(400).json({
            error: {
                status: 400,
                title: 'Registration error',
                source: '/register',
                detail: 'email or password is missing',
            },
        });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await User.create({ email, password: hashedPassword });
        res.status(201).json({
            msg: `User: ${user.email} was successfully registered`,
        });
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

module.exports = { registerUser };
