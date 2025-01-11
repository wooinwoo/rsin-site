import { getApiToken } from "~/cookies.server";

export async function withAuth<T>(
  request: Request,
  callback: (token: string) => Promise<T>
): Promise<T> {
  const token = await getApiToken(request);
  if (!token) throw new Error("Unauthorized");
  try {
    return await callback(token);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "An error occurred");
  }
}
