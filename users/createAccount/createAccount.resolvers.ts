import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _: any,
      { username, email, name, location, password, githubUsername }: User
    ) => {
      //  check if username or email are already on DB.
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username or password is already taken.");
        }
        //  hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username,
            email,
            name,
            location,
            password: hashedPassword,
            githubUsername,
          },
        });
        return {
          ok: true,
        };
      } catch (err: any) {
        return {
          ok: false,
          error: "Error creating account: " + err.message,
        };
      }
    },
  },
};
