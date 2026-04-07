"use client";

import { reachGoal } from "@/lib/metrika";
import { Button } from "../ui/button";
import { Phone } from "lucide-react";

interface PhoneMobileMenuLinkProps {
  className: string;
  phoneNumber: string;
  displayPhoneNumber: string;
}

export function PhoneMobileMenuLink({
  className,
  phoneNumber,
  displayPhoneNumber,
}: PhoneMobileMenuLinkProps) {
  return (
    <a
      href={`tel:${phoneNumber}`}
      className={className}
      onClick={() => reachGoal("phone_click")}
    >
      <Button
        variant="outline"
        className="cursor-pointer w-full h-12 text-base border-(--gold)/40 hover:border-(--gold) hover:bg-[var(--gold)]/10 bg-white/5 text-white backdrop-blur-sm"
      >
        <Phone className="h-5 w-5 mr-2 text-(--gold)" />
        {displayPhoneNumber}
      </Button>
    </a>
  );
}
