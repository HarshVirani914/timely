import { SatSymbol } from "@timely/ui/components/icon/SatSymbol";
import { CreditCard } from "lucide-react";

export function getPriceIcon(currency: string): React.FC<{ className: string }> | string {
  return currency !== "BTC" ? CreditCard : (SatSymbol as React.FC<{ className: string }>);
}
