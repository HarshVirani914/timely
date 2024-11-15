import dayjs from "@timely/dayjs";
import { sendPasswordResetEmail } from "@timely/emails";
import { PASSWORD_RESET_EXPIRY_HOURS } from "@timely/features/auth/lib/passwordResetRequest";
import { getTranslation } from "@timely/lib/server/i18n";
import { prisma } from "@timely/prisma";

import type { TrpcSessionUser } from "../../../trpc";
import type { TAdminPasswordResetSchema } from "./sendPasswordReset.schema";

type GetOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TAdminPasswordResetSchema;
};

const sendPasswordResetHandler = async ({ input }: GetOptions) => {
  const { userId } = input;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      locale: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const t = await getTranslation(user.locale ?? "en", "common");

  const expiry = dayjs().add(PASSWORD_RESET_EXPIRY_HOURS, "hours").toDate();

  const passwordResetToken = await prisma.resetPasswordRequest.create({
    data: {
      email: user.email,
      expires: expiry,
    },
  });

  const resetLink = `${process.env.NEXT_PUBLIC_WEBAPP_URL}/auth/forgot-password/${passwordResetToken.id}`;
  await sendPasswordResetEmail({
    language: t,
    user: {
      name: user.name,
      email: user.email,
    },
    resetLink,
  });

  return {
    success: true,
  };
};

export default sendPasswordResetHandler;
