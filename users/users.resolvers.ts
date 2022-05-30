import { User } from "@prisma/client";
import client from "../client";

export default {
  User: {
    totalFollowing: ({ id }: User) => {
      return client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      });
    },

    totalFollowers: ({ id }: User) =>
      client.user.count({
        where: {
          followings: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }: User, _: any, { loggedInUser }: any) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }: User, _: any, { loggedInUser }: any) => {
      if (!loggedInUser) {
        return false;
      }
      const followingUser = await client.user.count({
        where: {
          username: loggedInUser.username,
          followings: {
            some: {
              id,
            },
          },
        },
      });
      // if loggined user is following the user return true
      return Boolean(followingUser);
    },
  },
};
