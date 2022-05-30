import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    Unfollow(username: String!): UnFollowResult!
  }
  type UnFollowResult {
    ok: Boolean!
    error: String
  }
`;
