

import Intro from "@/components/Intro";
import Experience from "@/components/Experience";
import ProjectsPage from "@/components/Projects";
import MyResumeSection from "@/components/Work";

export default function Page() {
  return (
    <main className="overflow-x-hidden">         
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-5"> 

        <Intro />
        <ProjectsPage/>
        <MyResumeSection/>
        <Experience />

      </div>
    </main>
  );
}