"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Topics", href: "/topics" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="border-t mt-10 py-6 text-sm text-muted-foreground " >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-center md:text-left">&copy; {new Date().getFullYear()} YourApp. All rights reserved.</p>
        <nav className="flex gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-foreground transition-colors ${
                pathname === link.href ? "text-foreground font-medium" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
