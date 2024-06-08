import { auth } from "@/auth";

export default async function Feed() {
  const session = await auth();

  return <main className="mt-16">Feed</main>;
}
