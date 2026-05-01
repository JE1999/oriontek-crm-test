import { Separator } from "@/components/ui/separator";
import { useT } from "@/hooks/useT";
import { Calendar, Mail, MapPin, Phone } from "@/lib/icons";
import type { Client } from "@/types/client";
import { formatDate } from "@/utils/format";

interface ClientDetailViewProps {
  client: Client;
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100">
        <Icon className="h-4 w-4 text-slate-500" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-sm text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function AddressesRow({
  addresses,
  label,
}: {
  addresses: string[];
  label: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100">
        <MapPin className="h-4 w-4 text-slate-500" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-muted-foreground font-medium">
          {label}
          <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-500">
            {addresses.length}
          </span>
        </p>
        <ul className="mt-1 space-y-1.5">
          {addresses.map((addr, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold text-slate-500">
                {i + 1}
              </span>
              <span className="text-sm text-foreground">{addr}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ClientDetailView({ client }: ClientDetailViewProps) {
  const { t } = useT();
  const formattedDate = formatDate(client.createdAt);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <DetailRow
          icon={Mail}
          label={t("clientDetailCard.email")}
          value={client.email}
        />
        <DetailRow
          icon={Phone}
          label={t("clientDetailCard.phone")}
          value={client.phone}
        />
        <DetailRow
          icon={Calendar}
          label={t("clientDetailCard.registeredAt")}
          value={formattedDate}
        />
      </div>
      <Separator />
      <AddressesRow
        addresses={client.addresses}
        label={t("clientDetailCard.addresses")}
      />
    </div>
  );
}
