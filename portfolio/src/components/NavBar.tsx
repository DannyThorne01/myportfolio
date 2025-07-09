// src/components/NavBar.tsx
import CircularText from "./CircularText";
import GooeyNav from "./GooeyNav";

const items = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

const NavBar = () => (
  <header className="fixed inset-x-0 top-0 z-50 h-16 bg-black/90 backdrop-blur">
    <div className="relative h-full flex items-center justify-center">
      {/* gooey menu */}
      <GooeyNav
        items={items}
        particleCount={15}
        particleDistances={[90, 10]}
        particleR={100}
        initialActiveIndex={0}
        animationTime={600}
        timeVariance={300}
        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
      />

      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <CircularText
          text="FAITH + HOPE + DRIVE + "
          onHover="speedUp"
          spinDuration={20}
          className="text-[9px]"   /* tighten letters */
        />
      </div>
    </div>
  </header>
);

export default NavBar;
