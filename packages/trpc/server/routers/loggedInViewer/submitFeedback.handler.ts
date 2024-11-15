import dayjs from "@timely/dayjs";
import { sendFeedbackEmail } from "@timely/emails";
import { prisma } from "@timely/prisma";
import type { TrpcSessionUser } from "@timely/trpc/server/trpc";

import type { TSubmitFeedbackInputSchema } from "./submitFeedback.schema";

type SubmitFeedbackOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TSubmitFeedbackInputSchema;
};

export const submitFeedbackHandler = async ({ ctx, input }: SubmitFeedbackOptions) => {
  const { rating, comment } = input;

  const feedback = {
    username: ctx.user.username || "Nameless",
    email: ctx.user.email || "No email address",
    rating: rating,
    comment: comment,
  };

  await prisma.feedback.create({
    data: {
      date: dayjs().toISOString(),
      userId: ctx.user.id,
      rating: rating,
      comment: comment,
    },
  });

  if (process.env.SEND_FEEDBACK_EMAIL && comment) sendFeedbackEmail(feedback);
};
