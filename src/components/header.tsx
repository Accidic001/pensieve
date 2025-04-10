// components/header.tsx
'use client';

import { Menu, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import HeaderAuth from './header-auth';
import { SearchInput } from './search-input';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Separator } from './ui/separator';
import paths from '@/paths'; // Fixed import path
import { ThemeToggle } from './components/theme-toggle';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', href: paths.home() },
    { name: 'Top Posts', href: '/top-posts' }, // Updated to use paths
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between gap-4">
        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
                      <ThemeToggle/>
              <nav className="flex flex-col gap-1 pt-6">
                {navItems.map((item) => (
                  <div key={item.name}>
          
                    <Link
                      href={item.href}
                      className="block px-4 py-2 font-medium hover:bg-accent rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    <Separator className="my-1" />
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Brand logo/name */}
        <div className="flex items-center">
          <nav className="hidden md:block">
            <Link href="/" className="text-2xl font-semibold">
              Pensieve
            </Link>
          </nav>
        </div>

        {/* Desktop search */}
        <div className="hidden flex-1 max-w-md md:flex justify-center">
          <SearchInput />
          
                      <ThemeToggle/>

        </div>

        {/* Mobile search button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Search"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Auth section */}
        <div className="flex items-center justify-end space-x-2">
          <HeaderAuth />
        </div>
      </div>

      {/* Mobile search panel */}
      {searchOpen && (
        <div className="md:hidden p-2 border-t">
          <SearchInput />
        </div>
      )}
    </header>
  );
}