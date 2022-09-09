const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Message {
        title: String
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
    type Msgs {
        messages: [Message!]!
        total: Int!
    }

    type RootQuery {
        login(email: String! , password: String!): Auth!
        getMessages: Msgs!
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


    type RootMutation {
        createUser(userInput: UserInputData!): User!
        createMessage(msgInput: MsgInputData!): Message!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
