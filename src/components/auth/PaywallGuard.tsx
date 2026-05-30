"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PAYWALL_ACTIVE } from "@/lib/paywall-config";

export default function PaywallGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(!PAYWALL_ACTIVE);

  useEffect(() => {
    if (!PAYWALL_ACTIVE) {
      setAllowed(true);
      return;
    }
    const hasAccess = document.cookie.includes("pw_access=");
    if (!hasAccess) {
      router.replace("/unlock/");
    } else {
      setAllowed(true);
    }
  }, [router, pathname]);

  if (!allowed) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-earth-400 text-sm">验证访问权限...</div>
      </div>
    );
  }

  return <>{children}</>;
}
