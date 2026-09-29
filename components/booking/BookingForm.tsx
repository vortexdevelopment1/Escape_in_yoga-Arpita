import { Input } from "@/components/ui/Field";

export interface DetailsValues { name: string; email: string; phone: string }
export type DetailsErrors = Partial<Record<keyof DetailsValues, string | null>>;

interface Props {
  values: DetailsValues;
  errors: DetailsErrors;
  disabled?: boolean;
  onChange: (field: keyof DetailsValues, value: string) => void;
}

export default function BookingForm({ values, errors, disabled, onChange }: Props) {
  return (
    <div className="space-y-5">
      <Input id="name" label="Full name" autoComplete="name" value={values.name} error={errors.name} disabled={disabled} onChange={(e) => onChange("name", e.target.value)} />
      <Input id="email" type="email" label="Email" autoComplete="email" value={values.email} error={errors.email} disabled={disabled}
        hint="Use this email to log in. Live session access is tied to it." onChange={(e) => onChange("email", e.target.value)} />
      <Input id="phone" type="tel" label="Phone number" autoComplete="tel" placeholder="+91 98765 43210" value={values.phone} error={errors.phone} disabled={disabled}
        hint="Confirmations and reminders will be sent to this number on WhatsApp in the live product." onChange={(e) => onChange("phone", e.target.value)} />
    </div>
  );
}
