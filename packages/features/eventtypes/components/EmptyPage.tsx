import { useLocale } from "@timely/lib/hooks/useLocale";

const SkeletonEventType = () => {
  return (
    <div className="dark:bg-darkgray-100 bg-default h-24 w-full">
      <div className="p-5">
        <div className="flex space-x-2 rtl:space-x-reverse">
          <div className="dark:bg-darkgray-400 h-2 w-1/6 rounded-md bg-neutral-200" />
          <div className="dark:bg-darkgray-400 h-2 w-1/6 rounded-md bg-neutral-200" />
        </div>
        <div className="flex space-x-2 py-2 rtl:space-x-reverse">
          <div className="dark:bg-darkgray-400 h-2 w-1/12 rounded-md bg-neutral-200" />
          <div className="dark:bg-darkgray-400 h-2 w-1/6 rounded-md bg-neutral-200" />
          <div className="dark:bg-darkgray-400 h-2 w-1/12 rounded-md bg-neutral-200" />
        </div>
        <div className="flex space-x-2 py-1 rtl:space-x-reverse">
          <div className="dark:bg-darkgray-200 h-6 w-1/6 rounded-md bg-neutral-300" />
          <div className="dark:bg-darkgray-200 h-6 w-1/6 rounded-md bg-neutral-300" />
        </div>
      </div>
    </div>
  );
};

function EmptyPage({ name }: { name: string }) {
  const { t } = useLocale();
  return (
    <div className="relative text-center">
      <div className="dark:divide-darkgray-100 flex flex-col divide-y-2 blur-[3px]">
        <SkeletonEventType />
        <SkeletonEventType />
        <SkeletonEventType />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <h3 className="text-emphasis text-lg font-semibold">{t("no_event_types")} </h3>
        <h4 className="text-default text-sm leading-normal">{t("no_event_types_description", { name })}</h4>
      </div>
    </div>
  );
}

export default EmptyPage;
