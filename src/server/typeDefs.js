import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    users: [User!]
    books: [Book!]
    findUser(id: ID!): User
  }

  type Book {
    id: ID!
    owner: User!
    author: String!
    title: String!
    availability: Int
    description: String
    date: String
  }

  type User {
    id: ID!
    name: String
    books: [Book]
  }

  type Mutation {
    createUser(name: String!): User!
    addBook(ownerId: String!, author: String!, title: String! availability: Boolean, description: String): Book!
  }
`;
