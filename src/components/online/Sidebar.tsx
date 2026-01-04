"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  Home,
  BookOpen,
  Trophy,
  Users,
  Settings,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { key: "home", href: "/online/dashboard", icon: Home },
  { key: "programs", href: "/online/programs", icon: BookOpen },
  { key: "progress", href: "/online/dashboard/progress", icon: Trophy },
  { key: "team", href: "/online/dashboard/team", icon: Users },
  { key: "settings", href: "/online/settings", icon: Settings },
] as const;

export function Sidebar() {
  const t = useTranslations("OnlineDashboard");
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const NavContent = () => (
    <>
      <div className="p-6">
        <Link
          href="/online"
          className="flex items-center gap-2 text-jamun-blue"
        >
          <GraduationCap className="w-6 h-6" />
          <span className="font-semibold">JAMUN Online</span>
        </Link>
      </div>

      <nav className="px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-jamun-blue/10 text-jamun-blue"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className="w-5 h-5" />
              {t(item.key)}
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
        aria-label="Toggle navigation"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 pt-16",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <NavContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] hidden lg:block shrink-0">
        <NavContent />
      </aside>
    </>
  );
}
