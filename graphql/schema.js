const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Main {
        name: String!
        value: Int!
    }

    type RootQuery {
        main: Main!
    }

    input UserInputData {
        email: String!
        username: String!
        password: String!
    }

    type Post {
        title: String!
        content: String!
        createdAt: String!
    }

    type User {
        email: String!
        username: String!
        password: String!
        posts: [Post!]!
    }

    type RootMutation {
        createUser(userInput: UserInputData!): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
