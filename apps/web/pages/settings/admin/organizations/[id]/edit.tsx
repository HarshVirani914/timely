import OrgEditView from "@timely/features/ee/organizations/pages/settings/admin/AdminOrgEditPage";

import type { CalPageWrapper } from "@components/PageWrapper";
import PageWrapper from "@components/PageWrapper";

const Page = OrgEditView as CalPageWrapper;
Page.PageWrapper = PageWrapper;

export default Page;
