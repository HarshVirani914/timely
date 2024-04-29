import { prisma } from "@timely/prisma";
import { credentialForCalendarServiceSelect } from "@timely/prisma/selects/credential";

export async function getUsersCredentials(userId: number) {
  const credentials = await prisma.credential.findMany({
    where: {
      userId,
    },
    select: credentialForCalendarServiceSelect,
    orderBy: {
      id: "asc",
    },
  });
  return credentials;
}
