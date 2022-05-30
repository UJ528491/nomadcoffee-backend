import { gql } from "apollo-server-express";

export default gql`
  scalar Upload

  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      name: String
      username: String
      email: String
      password: String
      location: String
      avatarURL: Upload
    ): EditProfileResult!
  }
`;
