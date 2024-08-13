import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userResolvers = {
  Query: {
    // TODO: users query didn't seem to be working from the signup FE page
    users: () => User.find(),
    user: (parent, { id }) => User.findById(id),
    // TODO: Get usersUnderForeman working
    // usersUnderForeman: (parent, { foremanId }) => User.find({ foreman: foremanId }),
  },
  Mutation: {
    // TODO: Make sure that auth doesn't apply to these 2 resolvers
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
      return jwt.sign({ id: user.id, role: user.role, organization: user.organization }, process.env.JWT_SECRET);
    },
  },
};