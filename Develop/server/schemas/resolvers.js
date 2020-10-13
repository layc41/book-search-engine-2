// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
// const { Token } = require('graphql');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const foundUser = await User.findOne({ _id: context.user._id })
                    .select('__v -password')
                    .populate('books')
                return foundUser;
            }   
            throw new AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user)
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            
            return { token, user };
        },

        saveBook: async (parent, { bookToSave }, context) => {
            
            if (context.user) {
                const saveBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: { bookToSave } } },
                    { new: true }
                );
                return saveBook
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedBooks = await User.deleteOne(
                    {_id: context.user._id},
                    { $pull: { userData: { bookId: bookId }}}
                    .populate('books'),
                    {new: true }
                );
                return updatedBooks
            }

            throw new AuthenticationError('You need to be logged in!');
        }
        
    }
}   

module.exports = resolvers;