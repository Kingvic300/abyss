import { EnokiClient } from "@mysten/enoki";

export const enoki = new EnokiClient({
  apiKey: process.env.ENOKI_PRIVATE_KEY!,
});
