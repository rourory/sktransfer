"use client";

import { reachGoal } from "@/lib/metrika";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PhoneContactLinkProps {
  color: string;
  label: string;
  className: string;
  phoneNumber: string;
  displayPhoneNumber: string;
}

export function PhoneContactLink({
  color,
  label,
  className,
  phoneNumber,
  displayPhoneNumber,
}: PhoneContactLinkProps) {
  return (
    <a
      href={`tel:${phoneNumber}`}
      className={className}
      onClick={() => reachGoal("phone_click")}
    >
      <div
        className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${color} shadow-lg`}
      >
        <FontAwesomeIcon
          icon={faPhone}
          className="h-5 w-5 sm:h-6 sm:w-6 text-white"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs sm:text-sm text-gray-600 mb-0.5">{label}</div>
        <div className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-[var(--gold-dark)] transition-colors truncate">
          {displayPhoneNumber}
        </div>
      </div>
    </a>
  );
}
