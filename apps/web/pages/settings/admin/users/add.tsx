import UsersAddView from "@timely/features/ee/users/pages/users-add-view";

import type { CalPageWrapper } from "@components/PageWrapper";
import PageWrapper from "@components/PageWrapper";

const Page = UsersAddView as CalPageWrapper;
Page.PageWrapper = PageWrapper;

export default Page;
