import { useAutoAnimate } from "@formkit/auto-animate/react";
import { classNames } from "@timely/lib";
import { CAL_URL } from "@timely/lib/constants";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { MembershipRole } from "@timely/prisma/enums";
import { Avatar, Badge, Button, ButtonGroup, Select, Switch, Tooltip } from "@timely/ui";
import { ExternalLink, X } from "@timely/ui/components/icon";
import type { Props } from "react-select";

export type ChildrenEventType = {
  value: string;
  label: string;
  created: boolean;
  owner: {
    avatar: string;
    id: number;
    email: string;
    name: string;
    username: string;
    membership: MembershipRole;
    eventTypeSlugs: string[];
  };
  slug: string;
  hidden: boolean;
};

// TODO: This isnt just a select... rename this component in the future took me ages to find the component i was looking for
export const ChildrenEventTypeSelect = ({
  options = [],
  value = [],
  ...props
}: Omit<Props<ChildrenEventType, true>, "value" | "onChange"> & {
  value?: ChildrenEventType[];
  onChange: (value: readonly ChildrenEventType[]) => void;
}) => {
  const { t } = useLocale();
  const [animationRef] = useAutoAnimate<HTMLUListElement>();

  return (
    <>
      <Select
        name={props.name}
        placeholder={t("select")}
        options={options}
        value={value}
        isMulti
        {...props}
      />
      {/* This class name conditional looks a bit odd but it allows a seemless transition when using autoanimate
       - Slides down from the top instead of just teleporting in from nowhere*/}
      <ul
        className={classNames(
          "border-subtle divide-subtle mt-3 divide-y rounded-md",
          value.length >= 1 && "border"
        )}
        ref={animationRef}>
        {value.map((children, index) => (
          <li key={index}>
            <div className="flex flex-row items-center gap-3 p-3">
              <Avatar
                size="mdLg"
                className="overflow-visible"
                imageSrc={children.owner.avatar}
                alt={children.owner.name || children.owner.email || ""}
              />
              <div className="flex w-full flex-row justify-between">
                <div className="flex flex-col">
                  <span className="text text-sm font-semibold leading-none">
                    {children.owner.name || children.owner.email}
                    <div className="flex flex-row gap-1">
                      {children.owner.membership === MembershipRole.OWNER ? (
                        <Badge variant="gray">{t("owner")}</Badge>
                      ) : (
                        <Badge variant="gray">{t("member")}</Badge>
                      )}
                      {children.hidden && <Badge variant="gray">{t("hidden")}</Badge>}
                    </div>
                  </span>
                  {children.owner.username && (
                    <small className="text-subtle font-normal leading-normal">
                      {`/${children.owner.username}/${children.slug}`}
                    </small>
                  )}
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Tooltip content={t("show_eventtype_on_profile")}>
                    <div className="self-center rounded-md p-2">
                      <Switch
                        name="Hidden"
                        checked={!children.hidden}
                        onCheckedChange={(checked) => {
                          const newData = value.map((item) =>
                            item.owner.id === children.owner.id ? { ...item, hidden: !checked } : item
                          );
                          props.onChange(newData);
                        }}
                      />
                    </div>
                  </Tooltip>
                  <ButtonGroup combined>
                    {children.created && children.owner.username && (
                      <Tooltip content={t("preview")}>
                        <Button
                          data-testid="preview-button"
                          color="secondary"
                          target="_blank"
                          variant="icon"
                          href={`${CAL_URL}/${children.owner?.username}/${children.slug}`}
                          StartIcon={ExternalLink}
                        />
                      </Tooltip>
                    )}
                    <Tooltip content={t("delete")}>
                      <Button
                        color="secondary"
                        target="_blank"
                        variant="icon"
                        onClick={() =>
                          props.onChange(value.filter((item) => item.owner.id !== children.owner.id))
                        }
                        StartIcon={X}
                      />
                    </Tooltip>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChildrenEventTypeSelect;
