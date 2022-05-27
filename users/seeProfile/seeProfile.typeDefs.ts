import { gql } from "apollo-server";

export default gql`
  type seeProfileResult {
    ok: Boolean!
    error: String
    user: User
  }
  type Query {
    seeProfile(username: String!): seeProfileResult!
  }
`;
