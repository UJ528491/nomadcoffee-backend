import { User } from "@prisma/client";
import client from "../../client";

export default {
  Query: {
    seeProfile: async (_: any, { username }: User) =>
      await client.user.findUnique({
        where: {
          username,
        },
        include: {
          followers: true,
          followings: true,
        },
      }),
  },
};
