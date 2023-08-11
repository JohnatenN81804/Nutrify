const bcrypt = require('bcrypt');

const authenticateUser = async (req, res, next) => {
  try {
    // Session, user object attached to the request
    if (!req.session || !req.session.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { userName, password } = req.session.user;
    const user = users[userName]; //Implement user object or database

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next(); // User is authenticated, proceed to the protected route
  } catch (error) {
    res.status(500).json({ message: 'Error occurred' });
  }
};

module.exports = authenticateUser;