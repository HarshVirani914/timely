import { defaultHandler } from "@timely/lib/server";

export default defaultHandler({
  POST: import("./_postCheck"),
});
