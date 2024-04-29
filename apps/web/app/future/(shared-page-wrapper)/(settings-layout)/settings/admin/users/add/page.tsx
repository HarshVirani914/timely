import { _generateMetadata } from "app/_utils";

import Page from "@timely/features/ee/users/pages/users-add-view";

export const generateMetadata = async () =>
  await _generateMetadata(
    () => "Add new user",
    () => "Here you can add a new user."
  );

export default Page;
