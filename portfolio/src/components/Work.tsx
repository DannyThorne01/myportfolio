import ExperienceItem from "./TextBlock";
import CountUp from "./CountUp";
import { RoughNotation } from 'react-rough-notation';
const MyResumeSection = () => {
  return (
    <section className="w-full overflow-hidden px-4 py-8 mb-4">
      <h2 className="text-2xl font-bold mb-5">Work</h2>
      <ExperienceItem
        timeframe="January 2025"
        title="Geospatial FullStack Engineer"
        company={{ name: "Greenzone Analytics", url: "https://greenzonetest.vercel.app/monitoring-platform" }}
        description={<ul className="list-disc list-inside mb-4 text-neutral-400 space-y-2">
      <li>
        Developed a scalable Next.js web application using PostgreSQL, Docker, and Supabase to deliver
        real-time rangeland health insights and sustainable livestock management tools to <span className="font-semibold text-lime-400/100 text-lg"> <CountUp
            from={0}
            to={300}
            separator=","
            direction="up"
            duration={2}
            className="count-up-text"
          /> </span>  Mongolian
        herders.
      </li>
      <li>
        Processed <RoughNotation
        type="circle"
        show={true}
        color="#84CC16"       
        animationDuration={800}
        padding={5}
        strokeWidth={3}
      > Sentinel-2 and MODIS NDVI </RoughNotation> data to predict above-ground biomass in Mongolian rangelands, leveraging ArcGIS Pro for gridding and a Random Forest Classifier for modeling.
      </li>
      <li>
        Led a 10-person team, integrating robust web-development pipelines into GitHub CI/CD workflows for
        continuous updates and real-time data powering the web platform.
      </li>
    </ul>}
        tags={["Deck.gl + ArcGIS Pro", "JavaScript", "Supabase", "SQL + Redis"]}
      />
      <ExperienceItem
        timeframe="Summer 2024"
        title="Development Operations Engineer Intern"
        company={{ name: "MIT Lincoln Laboratory", url: "https://www.ll.mit.edu/" }}
        description={
    <ul className="list-disc list-inside mb-4 text-neutral-400 space-y-2">
      <li>
        Engineered a <RoughNotation
        type="circle"
        show={true}
        color="#84CC16"       
        animationDuration={800}
        padding={5}
        strokeWidth={3}
      > containerized network </RoughNotation> architecture to emulate real-world disaster-relief communication systems, enabling scalable, realistic simulation environments for stress-testing and performance analysis.
      </li>
      <li>
        Automated end-to-end testing workflows using Python and Bash scripts, systematically evaluating three distinct strategies for monitoring data transmission and network resilience under simulated emergency conditions.
      </li>
      <li>
        Utilized Jenkins to orchestrate CI/CD pipelines, reducing container deployment time by <span className="font-semibold text-lime-400/100 text-lg"> <CountUp
            from={0}
            to={40}
            separator=","
            direction="up"
            duration={2}
            className="count-up-text"
          />% </span> and optimizing resource utilization for faster system simulation and performance tuning during disaster scenarios.
      </li>
    </ul>
  }
        tags={["Prometheus", "ElasticSearch", "Jenkins", "DevOps"]}
      />
      <ExperienceItem
        timeframe="Summer 2023"
        title="Machine Learning Engineering Intern"
        company={{ name: "Google Cloud", url: "https://cloud.google.com/" }}
          description={
          <ul className="list-disc list-inside mb-4 text-neutral-400 space-y-2">
      <li>
        Implemented a performance profiling binary to measure the <RoughNotation
        type="circle"
        show={true}
        color="#84CC16"       
        animationDuration={800}
        padding={5}
        strokeWidth={3}
      > complexity </RoughNotation> of deployed ML models using TensorFlow and TensorBoard Visualiser.
      </li>
      <li>
        Integrated profiling application as a feature in GCP's Vertex AI Online Prediction API allowing customers to deploy ML models with built-in performance profiling for efficient optimization.
      </li>
      <li>
        Conducted rigorous end-to-end tests that achieved <span className="font-semibold text-lime-300"> <CountUp
            from={0}
            to={83}
            separator=","
            direction="up"
            duration={2}
            className="count-up-text"
          />% </span> accuracy in profiling data and validated compatibility across TensorFlow, PyTorch, and scikit-learn.
      </li>
    </ul>
        }
        tags={["Python", "Tensorflow", "Kubernetes", "Docker"]}
      />
    </section>
  );
};
export default MyResumeSection;
