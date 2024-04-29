import { UserPermissionRole } from "@timely/prisma/enums";
import type { NextApiRequest } from "next";

export const isAdminGuard = async (req: NextApiRequest) => {
  const { userId, prisma } = req;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user?.role === UserPermissionRole.ADMIN;
};
