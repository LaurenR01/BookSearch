const {User} = require('../models');

const resolvers = {
    Query: {
        getMe: async () => {
            return await User.find({}).populate();
        }
    },
    Mutation: {
        loginUser: async () => {
            return await Auth.find({}).populate('user');
        },
        addUser: async () => {
            return await Auth.find({}).populate('user');
        },
        saveBook: async () => {
            return await User.find({}).populate('books');
        },
        removeBook: async () => {
            return await User.find({}).populate('bookId');
        }

    },

}