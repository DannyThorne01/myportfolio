// ProjectsPage.tsx
import Carousel from "./molecules/Carousel";

const projects = [
  {
    name: "CHOMPY",
    github: "https://github.com/DannyThorne01/Chompyy",
    picture: "./chompy.png",
    description:
      "Therapeutic Bot that helps relieve stress through chomping on emotional notes",
  },
  {
    name: "LULC Project",
    website: "https://lulc-analysis.vercel.app/",
    picture: "./lulc.png",
    description: "A way to view time series data of Land Use Land Cover Change of the World",
  },
  {
    name: "Tompkins Suitability Analysis",
    website: "/blog/tompkins_county",
    picture: "/tmp.png",
    description: "ArcGIS Project that determines best crop areas in Tompkins.",
  }
];

export default function ProjectsPage() {
  return (
    <section id ="projects" className="w-full overflow-hidden px-4 py-8 mb-10">
      <h2 className="text-2xl font-bold mb-10">Projects</h2>
      <Carousel projects={projects} />
    </section>
  );
}
