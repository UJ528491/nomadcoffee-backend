export const protectedResolver =
  (ourResolver: any) => (root: any, args: any, context: any, info: any) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please login to perform this action",
      };
    }
    return ourResolver(root, args, context, info);
  };
