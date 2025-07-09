// ProjectsPage.tsx
import Carousel from "./Carousel";

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
    github: "https://github.com/your/pigeon",
    picture: "/tmp.png",
    description: "A Suitability Analysis Project in ArcGIS Pro that determines best crop areas in Tompkins.",
  },
];

export default function ProjectsPage() {
  return (
    <section className="w-full overflow-hidden px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <Carousel projects={projects} />
    </section>
  );
}
