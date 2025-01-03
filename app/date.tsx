import { format } from "date-fns";

export default function DateComponent({ dateString, ...props }: { dateString: string, [key: string]: any; }) {
  return (
    <time dateTime={dateString} {...props}>
      {format(new Date(dateString), "LLLL	d, yyyy")}
    </time>
  );
}
