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

    type Auth {
        token: String!
        email: String!
    }

    type RootQuery {
        getUser: User!
        login(email: String! , password: String!): Auth!
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
