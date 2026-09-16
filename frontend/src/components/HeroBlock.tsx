import { PinkStar, SmileyStar } from "./hero-icons";

/**
 * Left block of the home screen: the three centred words, the two-line
 * subtitle with the heart, and the two pill buttons.
 *
 * Geometry comes from measuring the target design (1382x920) - see the table
 * in globals.css next to .hero-left.
 *
 * The telescope and the two children on the pills are the real artwork cut out
 * of the target as transparent PNGs. The two little stars are drawn as SVG:
 * in the target they sit on a same-colour pill with almost no contrast, so a
 * cut-out of them comes out full of holes.
 */
export default function HeroBlock() {
  return (
    <div className="hero-left">
      <h1 className="hero-words">
        <span style={{ color: "#0A33B8" }}>تعلم</span>
        <span style={{ color: "#068B44" }}>ألعب</span>
        <span style={{ color: "#FC6C00" }}>واكتشف</span>
      </h1>

      <span className="confetti confetti-a" aria-hidden="true" />
      <span className="confetti confetti-b" aria-hidden="true" />
      <span className="confetti confetti-c" aria-hidden="true" />
      <span className="confetti confetti-d" aria-hidden="true" />
      <span className="confetti confetti-e" aria-hidden="true" />

      <p className="hero-sub">
        رحلة ممتعة مليئة بالمعرفة واللعب
        <br />
        <span className="heart">&#10084;</span> تنتظرك كل يوم!
      </p>

      <div className="hero-buttons">
        <button type="button" className="hero-pill hs pill-orange">
          <span className="pill-text">اكتشف معنا</span>
          <span className="pill-spark" aria-hidden="true">
            <SmileyStar />
          </span>
          <span className="pill-icon" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/telescope.png" alt="" />
          </span>
        </button>

        <button type="button" className="hero-pill hs pill-purple">
          <span className="pill-text">انضم إلينا</span>
          <span className="pill-spark" aria-hidden="true">
            <PinkStar />
          </span>
          <span className="pill-icon" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/icons/kids.png" alt="" />
          </span>
        </button>
      </div>
    </div>
  );
}
