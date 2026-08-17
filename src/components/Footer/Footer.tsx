import { Facebook, Instagram, Twitter } from "lucide-react";
import { footerColumns } from "@/data/content";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <div className="wrap footer__brand-inner">
          <p className="footer__logo">Bandage</p>
          <div className="footer__social">
            <a href="#" aria-label="Facebook"><Facebook size={24} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={24} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={24} /></a>
          </div>
        </div>
      </div>

      <div className="footer__main">
        <div className="wrap footer__columns">
          {footerColumns.map((column) => (
            <nav className="footer__column" key={column.heading}>
              <h3 className="footer__heading">{column.heading}</h3>
              <ul className="footer__links">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer__column">
            <h3 className="footer__heading">Get In Touch</h3>
            <form className="subscribe" action="#">
              <label className="visually-hidden" htmlFor="subscribe-email">
                Your Email
              </label>
              <input
                id="subscribe-email"
                type="email"
                placeholder="Your Email"
                className="subscribe__input"
              />
              <button type="submit" className="subscribe__button">
                Subscribe
              </button>
            </form>
            <p className="footer__note">Lore imp sum dolor Amit</p>
          </div>
        </div>
      </div>

      <div className="footer__legal">
        <div className="wrap">
          <p>Made With Love By Finland All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
}
