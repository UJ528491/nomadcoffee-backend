import jwt from "jsonwebtoken";
import client from "../../client";

const varifyToken = (token: string) => {
  if (!token) {
    throw new Error("No token provided");
  }
  const secret = process.env.JWT_SECRET;
  if (secret) {
    return jwt.verify(token, secret);
  }
  // no user data in token
  return null;
};

export const getUser = async (token: any) => {
  try {
    const { id }: any = await varifyToken(token);
    const user = await client.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      return user;
    }
    return null;
  } catch (error) {
    return null;
  }
};
