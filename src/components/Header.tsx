"use client";

import { useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useAppSelector } from "@/lib/store/hooks";
import {
  selectCartCount,
  selectWishlistCount,
} from "@/lib/store/slices/cartSlice";

const desktopNav = ["Home", "Shop", "About", "Blog", "Contact", "Pages"];
const mobileNav = ["Home", "Product", "Pricing", "Contact"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const cartCount = useAppSelector(selectCartCount);
  const wishlistCount = useAppSelector(selectWishlistCount);

  return (
    <header className="bg-white">
      <div className="mx-auto flex h-[58px] max-w-[1440px] items-center justify-between px-6 lg:h-[91px] xl:px-[105px]">
        <a href="/" className="text-24 font-bold text-navy">
          Bandage
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex lg:items-center lg:gap-[21px]">
          {desktopNav.map((item) => (
            <a
              key={item}
              href="#"
              className="flex items-center gap-[10px] text-14t font-bold text-muted hover:text-navy"
            >
              {item}
              {item === "Shop" && <ChevronDown size={14} className="text-primary" />}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex lg:items-center lg:gap-[15px] lg:text-primary">
          <a href="#" className="flex items-center gap-[5px] text-14t font-bold">
            <User size={16} />
            Login / Register
          </a>
          <button aria-label="Search" className="p-[5px]">
            <Search size={16} />
          </button>
          <button
            aria-label={`Cart, ${cartCount} items`}
            className="flex items-center gap-[5px] p-[5px] text-12"
          >
            <ShoppingCart size={16} />
            {cartCount}
          </button>
          <button
            aria-label={`Wishlist, ${wishlistCount} items`}
            className="flex items-center gap-[5px] p-[5px] text-12"
          >
            <Heart size={16} />
            {wishlistCount}
          </button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-[21px] text-navy lg:hidden">
          <button aria-label="Search">
            <Search size={22} strokeWidth={2.2} />
          </button>
          <button aria-label="Cart">
            <ShoppingCart size={22} strokeWidth={2.2} />
          </button>
          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — shown expanded in the Figma frame, collapsible here. */}
      {open && (
        <nav className="flex flex-col items-center gap-[30px] py-[24px] lg:hidden">
          {mobileNav.map((item) => (
            <a key={item} href="#" className="text-30 text-gray-soft">
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
