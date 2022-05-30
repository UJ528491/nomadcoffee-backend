import { User } from "@prisma/client";
import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_: any, { username, lastID }: any) => {
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
        // find following
        const following = await client.user
          .findUnique({
            where: { username },
          })
          .followings({
            take: 5,
            // using cursor to paginate
            skip: lastID ? 1 : 0,
            ...(lastID && { cursor: { id: lastID } }),
          });
        return {
          ok: true,
          following,
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
