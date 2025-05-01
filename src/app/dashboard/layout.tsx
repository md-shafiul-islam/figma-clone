"use client";
import LogOut from "@/components/ui/Login/LogOut";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-row-reverse">
        <LogOut />
      </div>
      {children}
    </div>
  );
}
