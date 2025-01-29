"use client";

import Image from "next/image";

export function HorizonStudioIcon({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/Logo_DEV2_PNG.png"
        alt="Horizon Studio Logo"
        width={24}
        height={24}
        className="object-contain dark:hidden"
      />
      <Image
        src="/Logo_DEV_PNG.png"
        alt="Horizon Studio Logo"
        width={24}
        height={24}
        className="object-contain hidden dark:block"
      />
    </div>
  );
} 