const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userResolvers = {
  Query: {
    users: () => User.find(),
    user: (parent, { id }) => User.findById(id),
    usersUnderForeman: (parent, { foremanId }) => User.find({ foreman: foremanId }),
  },
  Mutation: {
    signUp: async (parent, { username, email, password, role, organization, foreman }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
        organization,
        foreman: role === 'Basic User' ? foreman : undefined,
      });
      return newUser.save();
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !await bcrypt.compare(password, user.password)) {
        throw new Error('Invalid login credentials');
      }
      return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    },
  },
};

module.exports = userResolvers;