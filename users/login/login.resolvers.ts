import { User } from "@prisma/client";
import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_: any, { username, password }: User) => {
      try {
        // check if user exists
        const user = await client.user.findUnique({
          where: {
            username,
          },
        });
        if (!user) {
          throw new Error("User not found");
        }

        // check if password is correct
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error("Invalid password");
        }
        // generate token
        const secret = process.env.JWT_SECRET;
        if (secret) {
          const token = await jwt.sign({ id: user.id }, secret);
          return {
            ok: true,
            token,
          };
        }
        return {
          ok: false,
          error: "Can't make token",
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
