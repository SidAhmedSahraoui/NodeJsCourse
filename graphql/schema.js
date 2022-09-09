const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        email: String!
        username: String!
        password: String
        messages: [Message!]!
    }

    type Message {
        title: String
        content: String!
        creator: User!
        isFav: Boolean!
        createdAt: String!
    }

    type Auth {
        token: String!
        email: String!
    }
    type Messages {
        messages: [Message!]!
        total: Int!
    }

    input UserInputData {
        email: String!
        username: String!
        password: String!
    }

    input MsgInputData {
        title: String!
        content: String!
    }

    type RootQuery {
        login(email: String! , password: String!): Auth!
        getMessages: Messages!
        getUserMessages: Messages!
    }

    type RootMutation {
        createUser(userInput: UserInputData!): User!
        createMessage(msgInput: MsgInputData!): Message!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
