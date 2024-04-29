import prismaMock from "../../../tests/libs/__mocks__/prismaMock";

import { describe, it, expect } from "vitest";

import { RedirectType } from "@timely/prisma/client";

import { getTemporaryOrgRedirect } from "./getTemporaryOrgRedirect";

function mockARedirectInDB({
  toUrl,
  slug,
  redirectType,
}: {
  toUrl: string;
  slug: string;
  redirectType: RedirectType;
}) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  prismaMock.tempOrgRedirect.findUnique.mockImplementation(({ where }) => {
    return new Promise((resolve) => {
      if (
        where.from_type_fromOrgId.type === redirectType &&
        where.from_type_fromOrgId.from === slug &&
        where.from_type_fromOrgId.fromOrgId === 0
      ) {
        resolve({ toUrl });
      } else {
        resolve(null);
      }
    });
  });
}

describe("getTemporaryOrgRedirect", () => {
  it("should generate event-type URL without existing query params", async () => {
    mockARedirectInDB({ slug: "slug", toUrl: "https://timely.timely", redirectType: RedirectType.User });
    const redirect = await getTemporaryOrgRedirect({
      slug: "slug",
      redirectType: RedirectType.User,
      eventTypeSlug: "30min",
      currentQuery: {},
    });

    expect(redirect).toEqual({
      redirect: {
        permanent: false,
        destination: "https://timely.timely/30min",
      },
    });
  });

  it("should generate event-type URL with existing query params", async () => {
    mockARedirectInDB({ slug: "slug", toUrl: "https://timely.timely", redirectType: RedirectType.User });

    const redirect = await getTemporaryOrgRedirect({
      slug: "slug",
      redirectType: RedirectType.User,
      eventTypeSlug: "30min",
      currentQuery: {
        abc: "1",
      },
    });

    expect(redirect).toEqual({
      redirect: {
        permanent: false,
        destination: "https://timely.timely/30min?abc=1",
      },
    });
  });

  it("should generate User URL with existing query params", async () => {
    mockARedirectInDB({ slug: "slug", toUrl: "https://timely.timely", redirectType: RedirectType.User });

    const redirect = await getTemporaryOrgRedirect({
      slug: "slug",
      redirectType: RedirectType.User,
      eventTypeSlug: null,
      currentQuery: {
        abc: "1",
      },
    });

    expect(redirect).toEqual({
      redirect: {
        permanent: false,
        destination: "https://timely.timely?abc=1",
      },
    });
  });

  it("should generate Team Profile URL with existing query params", async () => {
    mockARedirectInDB({
      slug: "seeded-team",
      toUrl: "https://timely.timely",
      redirectType: RedirectType.Team,
    });

    const redirect = await getTemporaryOrgRedirect({
      slug: "seeded-team",
      redirectType: RedirectType.Team,
      eventTypeSlug: null,
      currentQuery: {
        abc: "1",
      },
    });

    expect(redirect).toEqual({
      redirect: {
        permanent: false,
        destination: "https://timely.timely?abc=1",
      },
    });
  });

  it("should generate Team Event URL with existing query params", async () => {
    mockARedirectInDB({
      slug: "seeded-team",
      toUrl: "https://timely.timely",
      redirectType: RedirectType.Team,
    });

    const redirect = await getTemporaryOrgRedirect({
      slug: "seeded-team",
      redirectType: RedirectType.Team,
      eventTypeSlug: "30min",
      currentQuery: {
        abc: "1",
      },
    });

    expect(redirect).toEqual({
      redirect: {
        permanent: false,
        destination: "https://timely.timely/30min?abc=1",
      },
    });
  });

  it("should generate Team Event URL without query params", async () => {
    mockARedirectInDB({
      slug: "seeded-team",
      toUrl: "https://timely.timely",
      redirectType: RedirectType.Team,
    });

    const redirect = await getTemporaryOrgRedirect({
      slug: "seeded-team",
      redirectType: RedirectType.Team,
      eventTypeSlug: "30min",
      currentQuery: {},
    });

    expect(redirect).toEqual({
      redirect: {
        permanent: false,
        destination: "https://timely.timely/30min",
      },
    });
  });
});
