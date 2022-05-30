import client from "../../client";

export default {
  Query: {
    searchUsers: async (_: any, { keyword }: any) => {
      return await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      });
    },
  },
};
