
'use client';

import { Menu, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import HeaderAuth from './header-auth';
import { SearchInput } from './search-input';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Separator } from './ui/separator';
import paths from '@/paths'; 
import { ThemeToggle } from './components/theme-toggle';
import { useSession } from 'next-auth/react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const Session = useSession();
 
  
  const navItems = [
    { name: 'Home', href: paths.home() },
    { name: 'Top Posts', href: '/top-posts' }, // Updated to use paths
    { name: 'Topics', href: '/topic' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'My Posts', href: '/my-posts' },
  ];

  return (
    <header className="sticky flex top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between gap-4">
        {/* Mobile menu button */}
        <div className="flex ">
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
              <div className="flex items-center justify-between mx-3 content-center space-y-2 align-middle">
             <h1 className='bold text-xl font-medium'>mode toggle</h1>
              <ThemeToggle/>
              </div>
              
            </SheetContent>
          </Sheet>
        </div>

        {/* Brand logo/name */}
        <div className="flex items-center mr-2 ml-2">
          <nav className=" md:block">
            <Link href="/" className=" sm:text-xl text-2xl font-semibold">
              Pensieve
            </Link>
          </nav>
        </div>

        {/* Desktop search */}
        <div className="hidden flex-1 max-w-md md:flex justify-center space-x-1">
          <SearchInput />
          
                      <ThemeToggle/>

        </div>

        {/* Mobile search button */}
        
        { Session.status === "authenticated" ?
          <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Search"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div> : null
        }
        
       

        {/* Auth section */}
        <div className="flex items-center justify-end space-x-2 mr-5">
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