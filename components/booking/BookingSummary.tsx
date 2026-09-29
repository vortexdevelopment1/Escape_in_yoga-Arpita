import { formatDay, formatTime, fromISODate } from "@/lib/dates";

interface Props {
  className: string;
  label: string;
  dateISO: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  onEdit?: (step: number) => void;
}

export default function BookingSummary({ className, label, dateISO, time, name, email, phone, onEdit }: Props) {
  const rows: [string, string, number][] = [
    ["Class", `${className} (${label})`, 1],
    ["Start date", formatDay(fromISODate(dateISO)), 2],
    ["Time", formatTime(time), 3],
    ["Name", name, 4],
    ["Email", email, 4],
    ["Phone", phone, 4],
  ];
  return (
    <dl className="divide-y divide-brown/10 rounded-3xl bg-sand/70 px-6">
      {rows.map(([k, v, step]) => (
        <div key={k} className="flex items-center justify-between gap-4 py-4">
          <dt className="text-sm text-brown/70">{k}</dt>
          <dd className="flex items-center gap-4 text-right font-medium">
            <span className="break-all">{v}</span>
            {onEdit && <button onClick={() => onEdit(step)} className="text-sm font-semibold text-terracotta-dark underline underline-offset-4">Edit<span className="sr-only"> {k}</span></button>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
