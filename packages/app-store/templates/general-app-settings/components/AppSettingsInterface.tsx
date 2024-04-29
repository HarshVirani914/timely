import { useLocale } from "@timely/lib/hooks/useLocale";
import { Button, TextField } from "@timely/ui";
import { useState } from "react";

export default function AppSettings() {
  const { t } = useLocale();
  const [input, setInput] = useState("");

  return (
    <div className="space-y-4 px-4 pb-4 pt-4 text-sm">
      <TextField
        placeholder="Some Input"
        value={input}
        name="Enter Input"
        onChange={async (e) => {
          setInput(e.target.value);
        }}
      />
      <Button>{t("submit")}</Button>
    </div>
  );
}
