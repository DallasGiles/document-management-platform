const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userResolvers = {
  Query: {
    users: () => User.find(),
    user: (parent, { id }) => User.findById(id),
  },
  Mutation: {
    signUp: async (parent, { username, email, password, role }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword, role });
      return user.save();
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