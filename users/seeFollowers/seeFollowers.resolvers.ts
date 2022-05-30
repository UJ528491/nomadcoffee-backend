import { User } from "@prisma/client";
import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_: any, { username, page }: any) => {
      try {
        // find user
        const user = await client.user.findUnique({
          where: {
            username,
          },
          select: {
            id: true,
          },
        });
        if (!user) {
          throw new Error("User not found");
        }

        // find followers
        const followers = await client.user
          .findUnique({
            where: { username },
          })
          .followers({
            take: 5,
            skip: (page - 1) * 5,
          });
        const totalFollowers = await client.user.count({
          where: { followings: { some: { username } } },
        });
        return {
          ok: true,
          followers,
          totalPages: Math.ceil(totalFollowers / 5),
        };
      } catch (err: any) {
        return {
          ok: false,
          error: err.message,
        };
      }
    },
  },
};
