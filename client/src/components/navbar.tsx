import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, List, Heart, Map, Menu, X } from "lucide-react";
import { useState } from "react";
import mountainLogo from "@assets/generated_images/Mountain_logo_for_header_4a69b5a7.png";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/listings", label: "Listings", icon: List },
    { href: "/map", label: "Map View", icon: Map },
    { href: "/favorites", label: "Favorites", icon: Heart },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src={mountainLogo} alt="Cheyyar Properties" className="w-10 h-10 object-contain" />
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Cheyyar Properties
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="gap-2"
                    data-testid={`nav-${link.label.toLowerCase().replace(" ", "-")}`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/contact">
              <Button variant="ghost" data-testid="nav-contact">Contact Us</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" data-testid="nav-about">About</Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
            <Link href="/contact">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
