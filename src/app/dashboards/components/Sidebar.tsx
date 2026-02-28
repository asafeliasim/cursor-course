"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";

const navItems = [
  { label: "Overview", href: "/dashboards", icon: "home" as const },
  { label: "API Playground", href: "/dashboards/playground", icon: "code" as const },
  { label: "Billing", href: "#", icon: "credit" as const },
  { label: "Settings", href: "#", icon: "gear" as const },
  { label: "Documentation", href: "#", icon: "doc" as const, external: true },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 bg-gray-200/80 border-r border-gray-300 flex flex-col">
      <div className="p-4 border-b border-gray-300">
        <Link href="/" className="text-xl font-semibold text-gray-900">
          Dandi
        </Link>
      </div>
      <div className="p-3">
        <button
          type="button"
          className="w-full flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2.5 text-left text-sm font-medium text-blue-600 shadow-sm border border-gray-200"
        >
          <span className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-gray-600">
              <Icon name="home" className="w-4 h-4" />
            </span>
            Personal
          </span>
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600">
          <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-medium">
            U
          </div>
          <span>User</span>
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </div>
      <nav className="flex-1 px-2 py-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = item.href !== "#" && pathname === item.href;
          return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
              isActive
                ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon name={item.icon} className="w-5 h-5 shrink-0" />
            {item.label}
            {"external" in item && item.external && (
              <svg className="w-3.5 h-3.5 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            )}
          </Link>
          );
        })}
      </nav>
    </aside>
  );
}
