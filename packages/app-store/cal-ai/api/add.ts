import { defaultHandler } from "@timely/lib/server";

export default defaultHandler({
  GET: import("./_getAdd"),
});
