const {gql} = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: Int
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: String
    user: [User]
}

type Query {
    me: [User]
}

input saveBook{
    authors:[String]
    description:String 
    title:String
    bookId: Int
    image:String
    link:String User
}

type Mutation {
    login(email:String!, password:String!): Auth
    addUser(username:String!, email:String!, password:String!): Auth
    saveBook(book: saveBook!): User
    removeBook(bookId: Int) : User
}
`