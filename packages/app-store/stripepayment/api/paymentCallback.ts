import { getCustomerAndCheckoutSession } from "@timely/app-store/stripepayment/lib/getCustomerAndCheckoutSession";
import { WEBAPP_URL } from "@timely/lib/constants";
import { HttpError } from "@timely/lib/http-error";
import { defaultHandler, defaultResponder } from "@timely/lib/server";
import { prisma } from "@timely/prisma";
import type { Prisma } from "@timely/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

const querySchema = z.object({
  callbackUrl: z.string().transform((url) => {
    if (url.search(/^https?:\/\//) === -1) {
      url = `${WEBAPP_URL}${url}`;
    }
    return new URL(url);
  }),
  checkoutSessionId: z.string(),
});

// It handles premium user payment success/failure
async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { callbackUrl, checkoutSessionId } = querySchema.parse(req.query);
  const { stripeCustomer, checkoutSession } = await getCustomerAndCheckoutSession(checkoutSessionId);

  if (!stripeCustomer)
    throw new HttpError({
      statusCode: 404,
      message: "Stripe customer not found or deleted",
      url: req.url,
      method: req.method,
    });

  // first let's try to find user by metadata stripeCustomerId
  let user = await prisma.user.findFirst({
    where: {
      metadata: {
        path: ["stripeCustomerId"],
        equals: stripeCustomer.id,
      },
    },
  });

  if (!user && stripeCustomer.email) {
    // if user not found, let's try to find user by email
    user = await prisma.user.findFirst({
      where: {
        email: stripeCustomer.email,
      },
    });
  }

  if (!user)
    throw new HttpError({ statusCode: 404, message: "User not found", url: req.url, method: req.method });

  if (checkoutSession.payment_status === "paid" && stripeCustomer.metadata.username) {
    try {
      await prisma.user.update({
        data: {
          username: stripeCustomer.metadata.username,
          metadata: {
            ...(user.metadata as Prisma.JsonObject),
            isPremium: true,
          },
        },
        where: {
          id: user.id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpError({
        statusCode: 400,
        url: req.url,
        method: req.method,
        message:
          "We have received your payment. Your premium username could still not be reserved. Please contact support@timely and mention your premium username",
      });
    }
  }
  callbackUrl.searchParams.set("paymentStatus", checkoutSession.payment_status);
  return res.redirect(callbackUrl.toString()).end();
}

export default defaultHandler({
  GET: Promise.resolve({ default: defaultResponder(getHandler) }),
});
