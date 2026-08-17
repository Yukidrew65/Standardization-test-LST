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
import { useAppSelector } from "@/store/hooks";
import { selectCartCount, selectWishlistCount } from "@/store/slices/cartSlice";
import "./Header.css";

const desktopNav = ["Home", "Shop", "About", "Blog", "Contact", "Pages"];
const mobileNav = ["Home", "Product", "Pricing", "Contact"];

export function Header() {
  const [open, setOpen] = useState(false);
  const cartCount = useAppSelector(selectCartCount);
  const wishlistCount = useAppSelector(selectWishlistCount);

  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__logo" href="/">
          Bandage
        </a>

        <nav className="header__nav" aria-label="Main">
          {desktopNav.map((item) => (
            <a key={item} className="header__nav-link" href="#">
              {item}
              {item === "Shop" && <ChevronDown size={14} className="header__caret" />}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a className="header__account" href="#">
            <User size={16} />
            Login / Register
          </a>
          <button className="header__icon-btn" aria-label="Search">
            <Search size={16} />
          </button>
          <button className="header__icon-btn" aria-label={`Cart, ${cartCount} items`}>
            <ShoppingCart size={16} />
            <span className="header__count">{cartCount}</span>
          </button>
          <button
            className="header__icon-btn"
            aria-label={`Wishlist, ${wishlistCount} items`}
          >
            <Heart size={16} />
            <span className="header__count">{wishlistCount}</span>
          </button>
        </div>

        <div className="header__mobile-actions">
          <button aria-label="Search">
            <Search size={22} strokeWidth={2.2} />
          </button>
          <button aria-label={`Cart, ${cartCount} items`}>
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

      {/* Drawn permanently expanded in the mobile frame; collapsible here so it
          does not occupy 400px above the fold on every load. */}
      {open && (
        <nav className="header__mobile-nav" aria-label="Mobile">
          {mobileNav.map((item) => (
            <a key={item} href="#">
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
