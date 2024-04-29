import { useLocale } from "@timely/lib/hooks/useLocale";
import { localStorage } from "@timely/lib/webstorage";
import { Card } from "@timely/ui";
import { useState, memo } from "react";

export const tips = [
  {
    id: 12,
    thumbnailUrl: "https://timely/og-image-cal-ai.jpg",
    mediaLink: "https://go.timely/cal-ai",
    title: "Cal.ai",
    description: "Your personal AI scheduling assistant",
    href: "https://go.timely/cal-ai",
  },
  {
    id: 11,
    thumbnailUrl: "https://img.youtube.com/vi/KTg_qzA9NEc/0.jpg",
    mediaLink: "https://go.timely/insights",
    title: "Insights",
    description: "Get a better understanding of your business",
    href: "https://go.timely/insights",
  },
  {
    id: 10,
    thumbnailUrl: "https://img.youtube.com/vi/jvaBafzVUQc/0.jpg",
    mediaLink: "https://go.timely/video",
    title: "Cal Video",
    description: "Free video conferencing with recording",
    href: "https://go.timely/video",
  },
  {
    id: 9,
    thumbnailUrl: "https://img.youtube.com/vi/93iOmzHieCU/0.jpg",
    mediaLink: "https://go.timely/round-robin",
    title: "Round-Robin",
    description: "Create advanced group meetings with round-robin",
    href: "https://go.timely/round-robin",
  },
  {
    id: 8,
    thumbnailUrl: "https://img.youtube.com/vi/piKlAiibAFo/0.jpg",
    mediaLink: "https://go.timely/workflows",
    title: "Automate Workflows",
    description: "Make time work for you and automate tasks",
    href: "https://go.timely/workflows",
  },
  {
    id: 7,
    thumbnailUrl: "https://img.youtube.com/vi/UVXgo12cY4g/0.jpg",
    mediaLink: "https://go.timely/routing-forms",
    title: "Routing Forms",
    description: "Ask questions and route to the correct person",
    href: "https://go.timely/routing-forms",
  },
  {
    id: 6,
    thumbnailUrl: "https://img.youtube.com/vi/yGiZo1Ry5-8/0.jpg",
    mediaLink: "https://go.timely/recurring-video",
    title: "Recurring Bookings",
    description: "Learn how to create a recurring schedule",
    href: "https://go.timely/recurring-video",
  },
  {
    id: 5,
    thumbnailUrl: "https://img.youtube.com/vi/0v_nQtpxC_4/0.jpg",
    mediaLink: "https://go.timely/payments-video",
    title: "Accept Payments",
    description: "Charge for your time with Timely's Stripe App",
    href: "https://app.timely/apps/stripe",
  },
  {
    id: 4,
    thumbnailUrl: "https://img.youtube.com/vi/zGr_s-fG84k/0.jpg",
    mediaLink: "https://go.timely/confirmation-video",
    title: "Requires Confirmation",
    description: "Learn how to be in charge of your bookings",
    href: "https://timely/resources/feature/opt-in",
  },
  {
    id: 3,
    thumbnailUrl: "https://img.youtube.com/vi/c7ZKFuLy1fg/0.jpg",
    mediaLink: "https://go.timely/routing-video",
    title: "Routing Forms, Workflows",
    description: "Ask screening questions of potential bookers to connect them with the right person",
    href: "https://timely/blog/cal-v-1-8",
  },
  {
    id: 2,
    thumbnailUrl: "https://img.youtube.com/vi/EAc46SPL6iA/0.jpg",
    mediaLink: "https://go.timely/teams-video",
    title: "How to set up Teams",
    description: "Learn how to use round-robin and collective events.",
    href: "https://timely/docs/enterprise-features/teams",
  },
  {
    id: 1,
    thumbnailUrl: "https://img.youtube.com/vi/60HJt8DOVNo/0.jpg",
    mediaLink: "https://go.timely/dynamic-video",
    title: "Dynamic booking links",
    description: "Booking link that allows people to quickly schedule meetings.",
    href: "https://timely/blog/cal-v-1-9",
  },
];

const reversedTips = tips.slice(0).reverse();

function Tips() {
  const { t } = useLocale();

  const [list, setList] = useState<typeof tips>(() => {
    if (typeof window === "undefined") {
      return reversedTips;
    }
    try {
      const removedTipsString = localStorage.getItem("removedTipsIds");
      if (removedTipsString !== null) {
        const removedTipsIds = removedTipsString.split(",").map((id) => parseInt(id, 10));
        const filteredTips = reversedTips.filter((tip) => removedTipsIds.indexOf(tip.id) === -1);
        return filteredTips;
      } else {
        return reversedTips;
      }
    } catch {
      return reversedTips;
    }
  });

  const handleRemoveItem = (id: number) => {
    setList((currentItems) => {
      const items = localStorage.getItem("removedTipsIds") || "";
      const itemToRemoveIndex = currentItems.findIndex((item) => item.id === id);

      localStorage.setItem(
        "removedTipsIds",
        `${currentItems[itemToRemoveIndex].id.toString()}${items.length > 0 ? `,${items.split(",")}` : ""}`
      );
      currentItems.splice(itemToRemoveIndex, 1);
      return [...currentItems];
    });
  };

  const baseOriginalList = list.slice(0).reverse();
  return (
    <div
      className="hidden pb-4 pt-8 lg:grid"
      /* ref={animationRef} */
      style={{
        gridTemplateColumns: "1fr",
      }}>
      {list.map((tip) => {
        return (
          <div
            className="relative"
            style={{
              gridRowStart: 1,
              gridColumnStart: 1,
            }}
            key={tip.id}>
            <div
              className="relative"
              style={{
                transform: `scale(${1 - baseOriginalList.indexOf(tip) / 20})`,
                top: -baseOriginalList.indexOf(tip) * 10,
                opacity: `${1 - baseOriginalList.indexOf(tip) / 7}`,
              }}>
              <Card
                variant="SidebarCard"
                thumbnailUrl={tip.thumbnailUrl}
                mediaLink={tip.mediaLink}
                title={tip.title}
                description={tip.description}
                learnMore={{ href: tip.href, text: t("learn_more") }}
                actionButton={{ onClick: () => handleRemoveItem(tip.id), child: t("dismiss") }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(Tips);
