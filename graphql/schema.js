const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Message {
        _id: ID!
        title: String!
        content: String!
        creator: User!
    }

    type User {
        _id: ID!
        email: String!
        password: String
        phone: Int!
        status: String!
        messages: [Message!]!
    }

    input UserInputData {
        email: String!
        password: String!
        phone: Int!
    }
    type RootQuery {
        getStatus: String!
        getAllUsers: [User!]!
        getUser: User!
        getAllMessages: [Message!]!
        getUserMessages: [Message!]!
        getMessage: Message!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
