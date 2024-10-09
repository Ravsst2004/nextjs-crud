"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Links {
  name: string;
  href: string;
}

const Sidebar = () => {
  const router = usePathname();

  const link: Links[] = [
    {
      name: "Task",
      href: "/",
    },
    {
      name: "Create Task",
      href: "/task/new",
    },
  ];

  return (
    <aside className="w-[15%] bg-primary text-white p-10">
      <h1 className="font-bold text-2xl">NextJS CRUD</h1>
      <div className="mt-10">
        <ul>
          {link.map((item) => (
            <li
              key={item.name}
              className={`${router === item.href ? "font-bold" : ""}`}
            >
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
