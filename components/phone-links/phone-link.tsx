"use client";

import { reachGoal } from "@/lib/metrika";

interface PhoneLinkProps {
  className: string;
  phoneNumber: string;
  displayPhoneNumber: string;
}

export function PhoneLink({
  className,
  phoneNumber,
  displayPhoneNumber,
}: PhoneLinkProps) {
  return (
    <a
      href={`tel:${phoneNumber}`}
      className={className}
      onClick={() => reachGoal("phone_click")}
    >
      {displayPhoneNumber}
    </a>
  );
}
