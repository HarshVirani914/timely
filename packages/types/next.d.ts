import type { PrismaClient } from "@timely/prisma";
import type { IncomingMessage } from "http";
import type { Session } from "next-auth";

import "./next-auth";

export declare module "next" {
  interface NextApiRequest extends IncomingMessage {
    // args is defined by /integrations/[...args] endpoint
    query: Partial<{ [key: string]: string | string[] }> & { args: string[] };
    session?: Session | null;
    // ⬇ These are needed by @timely/api
    body: unkown;
    userId: number;
    method: string;
    prisma: PrismaClient;
    // session: { user: { id: number } };
    // query: Partial<{ [key: string]: string | string[] }>;
    isAdmin: boolean;
    isCustomPrisma: boolean;
    pagination: { take: number; skip: number };
  }
}

export declare module "next/navigation" {
  interface Params {
    [key: string]: string;
  }
  export declare function useParams(): Params | null;
}
