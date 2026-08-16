import { Phone, Mail, Instagram, Youtube, Facebook, Twitter } from "lucide-react";

/** Desktop-only green utility bar. The mobile frame omits it entirely. */
export default function TopBar() {
  return (
    <div className="hidden bg-green text-white lg:block">
      <div className="mx-auto flex h-[58px] max-w-[1440px] items-center justify-between px-[24px] text-14t font-bold xl:px-[105px]">
        <div className="flex items-center gap-[30px]">
          <a href="tel:2255550118" className="flex items-center gap-[5px]">
            <Phone size={16} strokeWidth={2.5} />
            (225) 555-0118
          </a>
          <a
            href="mailto:michelle.rivera@example.com"
            className="flex items-center gap-[5px]"
          >
            <Mail size={16} strokeWidth={2.5} />
            michelle.rivera@example.com
          </a>
        </div>

        <p>Follow Us&nbsp; and get a chance to win 80% off</p>

        <div className="flex items-center gap-[10px]">
          <span>Follow Us :</span>
          <div className="flex items-center gap-[10px]">
            <a href="#" aria-label="Instagram"><Instagram size={16} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={16} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
