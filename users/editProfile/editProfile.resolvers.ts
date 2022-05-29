import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../utils/users.protectedResolver";
import { User } from "@prisma/client";
import { createWriteStream } from "fs";
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");

const editProfile = async (
  _: any,
  { name, username, email, password: newPassword, location, avatarURL }: User,
  { loggedInUser }: any
) => {
  let hashedPassword = null;
  if (newPassword) {
    hashedPassword = await bcrypt.hash(newPassword, 10);
  }
  let newAvatarURL = null;
  if (avatarURL) {
    const { filename, createReadStream }: any = await avatarURL;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/uploads/" + newFilename
    );
    await readStream.pipe(writeStream);
    newAvatarURL = `http://localhost:4000/static/${newFilename}`;
  }
  // check if loggedin user is the same as the user that is trying to edit
  const user = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      name,
      username,
      email,
      location,
      ...(hashedPassword && { password: hashedPassword }),
      ...(newAvatarURL && { avatarURL: newAvatarURL }),
    },
  });
  if (user) {
    return {
      ok: true,
    };
  }
  return {
    ok: false,
    error: "You can't edit this profile",
  };
};

export default {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(editProfile),
  },
};
