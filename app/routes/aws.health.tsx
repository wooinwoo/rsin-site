import { type LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return new Response("OK", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};

export const shouldRevalidate = () => false;

export const handle = {
  skipLogging: true,
};
