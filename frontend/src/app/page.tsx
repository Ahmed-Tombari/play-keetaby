import TopBar from "@/components/TopBar";
import HeroBlock from "@/components/HeroBlock";

export default function HomePage() {
  return (
    <main className="screen">
      <img
        className="screen-bg"
        src="/images/screen-home.webp"
        alt=""
        draggable={false}
      />
      <span className="screen-shade" aria-hidden="true" />
      <TopBar />
      <HeroBlock />
    </main>
  );
}
