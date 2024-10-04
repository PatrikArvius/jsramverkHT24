const User = require('../models/userModel.js');

async function shareDoc(req, res) {
    const email = req.body.email;
    const id = req.body.id;

    if (!(email && id)) {
        return res.status(401).json({
            error: {
                status: 401,
                title: 'Share error',
                source: '/share',
                detail: 'email or id is missing',
            },
        });
    }

    try {
        const user = await User.findOne({ email: email }).exec();
        res.status(200).json({
            msg: `User: ${user.email} exists`,
        });

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with the provided email' });
        }
    } catch (e) {
        res.status(500).json({
            error: {
                status: 500,
                type: 'put',
                source: '/share',
                title: 'Database error',
                detail: e.message,
            },
        });
    }
}

module.exports = { shareDoc };
