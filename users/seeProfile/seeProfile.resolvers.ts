import { User } from "@prisma/client";
import client from "../../client";

export default {
  Query: {
    seeProfile: async (_: any, { username }: User) => {
      try {
        const user = await client.user.findUnique({
          where: {
            username,
          },
        });
        return {
          ok: true,
          user,
        };
      } catch (err: any) {
        return {
          ok: false,
          error: "seeProfile error : " + err.message,
        };
      }
    },
  },
};
