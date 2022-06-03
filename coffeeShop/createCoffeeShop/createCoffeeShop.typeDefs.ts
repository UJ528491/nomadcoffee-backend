import { Category, CoffeeShop, CoffeeShopPhoto } from "@prisma/client";
import { gql } from "apollo-server-express";

export default gql`
  type CreateCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createCoffeeShop(
      name: String!
      files: Upload
      category: String
    ): CreateCoffeeShopResult!
  }
`;

export interface createCoffeeShop {
  name: CoffeeShop["name"];
  files: CoffeeShopPhoto["url"];
  category: Category["name"];
}
