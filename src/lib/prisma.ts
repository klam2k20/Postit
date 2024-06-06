import db from "@/lib/db";

const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email
    }
  });

  return user;
}

const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id
    }
  });

  return user;
}

export { getUserByEmail, getUserById }