import type { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "@timely/features/auth/lib/getServerSession";
import handleCancelBooking from "@timely/features/bookings/lib/handleCancelBooking";
import { defaultResponder, defaultHandler } from "@timely/lib/server";

async function handler(req: NextApiRequest & { userId?: number }, res: NextApiResponse) {
  const session = await getServerSession({ req, res });
  /* To mimic API behavior and comply with types */
  req.userId = session?.user?.id || -1;
  return await handleCancelBooking(req);
}

export default defaultHandler({
  DELETE: Promise.resolve({ default: defaultResponder(handler) }),
  POST: Promise.resolve({ default: defaultResponder(handler) }),
});
