const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Message {
        content: String!
        isFav: Boolean!
        createdAt: String!
    }

    type User {
        email: String!
        username: String!
        password: String
        messages: [Message!]!
    }

    type RootQuery {
        getUser: User!
    }

    input UserInputData {
        email: String!
        username: String!
        password: String!
    }


    type RootMutation {
        createUser(userInput: UserInputData!): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
