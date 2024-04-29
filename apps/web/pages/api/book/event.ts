import type { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "@timely/features/auth/lib/getServerSession";
import handleNewBooking from "@timely/features/bookings/lib/handleNewBooking";
import { checkRateLimitAndThrowError } from "@timely/lib/checkRateLimitAndThrowError";
import getIP from "@timely/lib/getIP";
import { defaultResponder } from "@timely/lib/server";

async function handler(req: NextApiRequest & { userId?: number }, res: NextApiResponse) {
  const userIp = getIP(req);

  await checkRateLimitAndThrowError({
    rateLimitingType: "core",
    identifier: userIp,
  });

  const session = await getServerSession({ req, res });
  /* To mimic API behavior and comply with types */
  req.userId = session?.user?.id || -1;
  const booking = await handleNewBooking(req, {
    isNotAnApiCall: true,
  });
  return booking;
}

export default defaultResponder(handler);
