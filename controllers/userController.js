const User = require('../models/userModel.js');

async function getAll(req, res) {
  try {
    const users = await User.find({}, 'email').exec();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = {
  getAll,
};
