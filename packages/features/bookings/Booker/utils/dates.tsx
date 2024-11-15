import { TimeFormat } from "@timely/lib/timeFormat";

interface EventFromToTime {
  date: string;
  duration: number | null;
  timeFormat: TimeFormat;
  timeZone: string;
  language: string;
}

export const formatEventFromToTime = ({
  date,
  duration,
  timeFormat,
  timeZone,
  language,
}: EventFromToTime) => {
  const startDate = new Date(date);
  const endDate = duration
    ? new Date(new Date(date).setMinutes(startDate.getMinutes() + duration))
    : startDate;

  const formattedDate = new Intl.DateTimeFormat(language, {
    timeZone,
    dateStyle: "full",
  }).formatRange(startDate, endDate);

  const formattedTime = new Intl.DateTimeFormat(language, {
    timeZone,
    timeStyle: "short",
    hour12: timeFormat === TimeFormat.TWELVE_HOUR ? true : false,
  })
    .formatRange(startDate, endDate)
    .toLowerCase();

  return { date: formattedDate, time: formattedTime };
};

export const FromToTime = (props: EventFromToTime) => {
  const formatted = formatEventFromToTime(props);
  return (
    <>
      {formatted.date}
      <br />
      {formatted.time}
    </>
  );
};
