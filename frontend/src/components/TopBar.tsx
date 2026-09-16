import Link from "next/link";

/**
 * Header: wordmark on the left, three navigation tiles on the right.
 * The order matters because the page is RTL, so the first tile in NAV is drawn
 * on the RIGHT: الرئيسية sits closest to the middle, as in the design.
 *
 * Icons are the real artwork cut from the design file as transparent PNGs
 * (public/images/icons/tile-*.png).
 *
 * Only the home page exists for now, so every tile points at "/". Give each one
 * its own href again when its page is built.
 */
const NAV = [
  { href: "/", label: "الرئيسية", icon: "/images/icons/tile-house.png" },
  { href: "/", label: "المحتوى", icon: "/images/icons/tile-book.png" },
  { href: "/", label: "اشترك", icon: "/images/icons/tile-person.png" },
];

export default function TopBar() {
  return (
    <header className="topbar">
      <nav className="nav-group" aria-label="القائمة الرئيسية">
        {NAV.map(({ href, label, icon }) => (
          <Link
            key={label}
            href={href}
            aria-label={label}
            aria-current={label === "الرئيسية" ? "page" : undefined}
            className={`hs${label === "الرئيسية" ? " is-active" : ""}`}
          >
            <span className="nav-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon} alt="" aria-hidden="true" />
              <span>{label}</span>
            </span>
          </Link>
        ))}
      </nav>

      <Link href="/" className="hs" aria-label="الصفحة الرئيسية">
        <span className="logo-block">
          {/* the real logo: star on an open book plus wordmark, cut from the
              design at 2x so it stays crisp on large screens */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/icons/logo.png" alt="متعة التعلم" />
        </span>
      </Link>
    </header>
  );
}
