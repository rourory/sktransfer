"use client";

import { reachGoal } from "@/lib/metrika";
import { Phone } from "lucide-react";

interface PhoneFooterLinkProps {
  className: string;
  label: string;
  phoneNumber: string;
  displayPhoneNumber: string;
}

export function PhoneFooterLink({
  className,
  label,
  phoneNumber,
  displayPhoneNumber,
}: PhoneFooterLinkProps) {
  return (
    <a
      href={`tel:${phoneNumber}`}
      className={className}
      onClick={() => reachGoal("phone_click")}
    >
      <div className="p-2 bg-white/10 border border-white/20 rounded-lg group-hover:bg-white/20 group-hover:border-white/40 transition-all shadow-lg shadow-white/5">
        <Phone className="h-4 w-4 text-white drop-shadow-md" />
      </div>
      <div>
        <div className="text-sm font-medium">{displayPhoneNumber}</div>
        <div className="text-xs text-gray-400">{label}</div>
      </div>
    </a>
  );
}
