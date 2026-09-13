import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/career")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
});
