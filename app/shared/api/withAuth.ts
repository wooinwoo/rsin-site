import { getApiToken } from "~/cookies.server";

export async function withAuth<T>(
  request: Request,
  callback: (token: string) => Promise<T>
): Promise<T> {
  console.log("withAuth:!!!");
  const token = await getApiToken(request);
  console.log(token);
  if (!token) throw new Error("Unauthorized");
  console.log("withAuth:!!!!!!!!!!!!!!!!");
  try {
    return await callback(token);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "An error occurred");
  }
}
