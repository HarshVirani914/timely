import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useLocale } from "@timely/lib/hooks/useLocale";
import { Avatar, EmptyScreen, Label, Select } from "@timely/ui";
import { UserPlus, X } from "@timely/ui/components/icon";
import type { Props } from "react-select";

export type CheckedUserSelectOption = {
  avatar: string;
  label: string;
  value: string;
  disabled?: boolean;
};

export const CheckedUserSelect = ({
  options = [],
  value = [],
  ...props
}: Omit<Props<CheckedUserSelectOption, true>, "value" | "onChange"> & {
  value?: readonly CheckedUserSelectOption[];
  onChange: (value: readonly CheckedUserSelectOption[]) => void;
}) => {
  const { t } = useLocale();

  const [animationRef] = useAutoAnimate<HTMLUListElement>();

  return (
    <>
      <Select
        name={props.name}
        placeholder={props.placeholder || t("select")}
        isSearchable={false}
        options={options}
        value={value}
        isMulti
        {...props}
      />
      {value.length > 0 ? (
        <div className="mt-6">
          <Label>{t("assigned_to")}</Label>
          <div className="flex overflow-hidden rounded-md border border-gray-200 bg-white">
            <ul className="w-full" data-testid="managed-event-types" ref={animationRef}>
              {value.map((option, index) => {
                return (
                  <li
                    key={option.value}
                    className={`flex px-3 py-2 ${index === value.length - 1 ? "" : "border-b"}`}>
                    <Avatar size="sm" imageSrc={option.avatar} alt={option.label} />
                    <p className="my-auto ml-3 text-sm text-gray-900">{option.label}</p>
                    <X
                      onClick={() => props.onChange(value.filter((item) => item.value !== option.value))}
                      className="my-auto ml-auto"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <EmptyScreen
            Icon={UserPlus}
            headline={t("no_assigned_members")}
            description={t("start_assigning_members_above")}
          />
        </div>
      )}
    </>
  );
};

export default CheckedUserSelect;
