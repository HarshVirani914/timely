import type { NextApiRequest, NextApiResponse } from "next";

export default async function TimelyApi(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Welcome to Timely API - docs are at https://developer.timely/api" });
}
