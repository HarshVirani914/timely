import TeamMembersView from "@timely/features/ee/organizations/pages/settings/other-team-members-view";

import type { CalPageWrapper } from "@components/PageWrapper";
import PageWrapper from "@components/PageWrapper";

const Page = TeamMembersView as CalPageWrapper;
Page.PageWrapper = PageWrapper;

export default Page;
