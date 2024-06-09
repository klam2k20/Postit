import db from "@/lib/db";
import { nanoid } from "nanoid";

export const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email
    }
  });

  return user;
}

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id
    }
  });

  return user;
}

export const createVerificationToken = async (email: string) => {
  let existingToken = await db.verificationToken.findFirst({
    where: {
      email: email
    }
  })

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const newToken = await db.verificationToken.create({
    data: {
      email,
      token: nanoid(),
      expires: new Date(new Date().getTime() + 3600 * 1000)
    }
  })

  return newToken;
}
