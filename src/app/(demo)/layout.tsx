"use client";

import AppLayout from "@/components/layout/app-layout";

export default function DemoLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
