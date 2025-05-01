import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_9tVcSO_9uiMqPKElMcj4VOa-9TmJ1HNJurGGpdyCu44jYgXsgggalKr5K_Pb2Yt8",
});

export async function POST(request: Request) {
  // Get the current user from your database
  const useSession = await auth();

  if (!useSession) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await db.user.findUnique({ where: { id: useSession.user.id } });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user.id,
    { userInfo: { name: user.email ?? "Anonymous" } }, // Optional
  );

  // Use a naming pattern to allow access to rooms with wildcards
  // Giving the user read access on their org, and write access on their group
  session.allow(`test`, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  console.log("authorize", body);
  return new Response(body, { status });
}
