import { User } from "@prisma/client";
import client from "../../client";
import { protectedResolver } from "../utils/users.protectedResolver";

export default {
  Mutation: {
    follow: protectedResolver(
      async (_: any, { username }: User, { loggedInUser }: any) => {
        const user = await client.user.findUnique({
          where: {
            username,
          },
        });
        if (!user) {
          return {
            ok: false,
            error: "User not found",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            followings: {
              connect: {
                username,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
