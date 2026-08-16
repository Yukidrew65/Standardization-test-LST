import { Facebook, Instagram, Twitter } from "lucide-react";
import { footerColumns } from "@/lib/data";

export default function Footer() {
  return (
    <footer>
      {/* Brand strip */}
      <div className="bg-light py-[40px]">
        <div className="wrap flex flex-col gap-[20px] lg:flex-row lg:items-center lg:justify-between">
          <p className="text-24 font-bold text-navy">Bandage</p>
          <div className="flex items-center gap-[20px] text-primary">
            <a href="#" aria-label="Facebook"><Facebook size={24} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={24} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={24} /></a>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="bg-white py-[50px]">
        <div className="wrap grid grid-cols-1 gap-[30px] lg:grid-cols-5">
          {footerColumns.map((col) => (
            <nav key={col.heading} className="flex flex-col gap-[20px]">
              <h3 className="text-16 font-bold text-navy">{col.heading}</h3>
              <ul className="flex flex-col gap-[10px]">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-14t font-bold text-muted hover:text-navy">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex flex-col gap-[20px]">
            <h3 className="text-16 font-bold text-navy">Get In Touch</h3>
            <form
              action="#"
              className="flex h-[58px] w-full max-w-[300px] overflow-hidden rounded-[5px] border border-gray-line bg-light"
            >
              <input
                type="email"
                placeholder="Your Email"
                aria-label="Your Email"
                className="min-w-0 flex-1 bg-transparent px-[15px] text-14 text-muted outline-none"
              />
              <button
                type="submit"
                className="shrink-0 bg-primary px-[20px] text-14 text-white"
              >
                Subscribe
              </button>
            </form>
            <p className="text-12 text-muted">Lore imp sum dolor Amit</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-light py-[25px]">
        <div className="wrap">
          <p className="text-14t font-bold text-muted">
            Made With Love By Finland All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
