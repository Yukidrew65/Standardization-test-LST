import { Phone, Mail, Instagram, Youtube, Facebook, Twitter } from "lucide-react";
import "./TopBar.css";

/** Desktop-only utility bar. The mobile frame omits it entirely. */
export function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar__inner">
        <div className="topbar__contact">
          <a className="topbar__link" href="tel:2255550118">
            <Phone size={16} strokeWidth={2.5} />
            (225) 555-0118
          </a>
          <a className="topbar__link" href="mailto:michelle.rivera@example.com">
            <Mail size={16} strokeWidth={2.5} />
            michelle.rivera@example.com
          </a>
        </div>

        <p className="topbar__promo">
          Follow Us&nbsp; and get a chance to win 80% off
        </p>

        <div className="topbar__social">
          <span>Follow Us :</span>
          <a href="#" aria-label="Instagram"><Instagram size={16} /></a>
          <a href="#" aria-label="YouTube"><Youtube size={16} /></a>
          <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
          <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
        </div>
      </div>
    </div>
  );
}
