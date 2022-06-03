import { User } from "@prisma/client";
import client from "../../client";
import { createCoffeeShop } from "./createCoffeeShop.typeDefs";

export default {
  Mutation: {
    createCoffeeShop: async (
      _: any,
      { name, files, category }: createCoffeeShop,
      { loggedInUser }: { loggedInUser: User | null }
    ) => {
      try {
        // check coffee shop name is unique
        const existingCoffeeShop = await client.coffeeShop.findFirst({
          where: {
            name,
          },
        });
        if (existingCoffeeShop) {
          throw new Error("This coffee shop name is already taken.");
        }
      } catch (error: any) {
        return {
          ok: false,
          error: error.message,
        };
      }
    },
  },
};
