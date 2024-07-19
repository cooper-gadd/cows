"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";

export function Moo() {
  return (
    <Button onClick={() => toast("🐮 ~ moo")} variant="ghost">
      🐄
    </Button>
  );
}
