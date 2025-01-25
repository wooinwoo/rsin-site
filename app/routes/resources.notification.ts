import { ActionFunctionArgs, json } from "@remix-run/node";
import {
  readNotifications,
  readAllNotifications,
} from "~/features/notification/api/notification.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "read") {
    const ids = JSON.parse(formData.get("ids") as string);
    await readNotifications(request, { ids });
  } else if (intent === "readAll") {
    await readAllNotifications(request);
  }

  return json({ success: true });
}
