import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
  console.log("DNS servers set to Google DNS in route.js");
} catch (e) {
  console.error("Failed to set DNS servers in route.js", e);
}

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
