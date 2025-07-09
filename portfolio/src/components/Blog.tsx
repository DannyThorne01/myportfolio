// BlogPost.tsx
"use client";

import React from "react";
import Image from "next/image";
import SoilReclassTable from "@/components/SoilReclassTable";

const LulcSummaryTable = () => (
  <table className="w-full max-w-md text-sm text-left border-collapse border border-white/20">
    <thead>
      <tr className="bg-white/10">
        <th className="px-3 py-2 font-semibold">Class</th>
        <th className="px-3 py-2 text-right font-semibold">Code</th>
        <th className="px-3 py-2 text-right font-semibold">% of County</th>
      </tr>
    </thead>
    <tbody>
      {[
        ["Agriculture", 1, "27.4"],
        ["Extraction", 2, "1.9"],
        ["Forest", 3, "48.6"],
        ["Water Resources", 4, "4.2"],
        ["Developed", 5, "15.3"],
        ["Outdoor Recreation", 6, "2.6"],
      ].map(([label, code, pct]) => (
        <tr key={label as string} className="border-t border-white/20">
          <td className="px-3 py-2">{label}</td>
          <td className="px-3 py-2 text-right">{code}</td>
          <td className="px-3 py-2 text-right">{pct}%</td>
        </tr>
      ))}
    </tbody>
  </table>
);

/**
 * Blog post layout – dark mode: black bg, white text.
 */
const BlogPost = () => (
  <article className="mx-auto max-w-4xl space-y-12 px-4 pb-16 bg-black text-white">
    {/* Hero */}
    <section className="border-b border-white/20 pb-8">
      <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
        Suitability Assessment for Agro‑Ecological Zones
      </h1>
      <time className="mt-2 block text-sm text-white/70">
        {new Date("2025-07-09").toLocaleDateString()}
      </time>
      <h2 className="mt-6 text-xl font-semibold">Goal</h2>
      <p className="leading-relaxed">
        This project performs a comprehensive suitability assessment of <em>Agro‑Ecological Zones (AEZ)</em> and potential
        <em> biofuel crop production</em> across Tompkins County. Global drivers—<strong>soil drainage</strong> and
        <strong> growing degree days (GDD)</strong>—define AEZs, while local constraints such as <strong>slope</strong> (DEM),
        <strong> land cover</strong>, and <strong>Unique Natural Areas (UNA)</strong> refine biosuitability. All layers are aligned to a 10 m UTM grid,
        enabling transparent map‑algebra overlays that spotlight high‑value agricultural zones without compromising ecological integrity.
      </p>
    </section>

    {/* Soil‑Drainage Section */}
    <section id="soil-drainage" className="space-y-6">
      <h2 className="text-2xl font-semibold">Soil‑Drainage Processing</h2>
      <p className="leading-relaxed">
        Soil characteristics were sourced from the&nbsp;
        <a
          href="https://www.nrcs.usda.gov/resources/data-and-reports/gridded-soil-survey-geographic-gssurgo-database"
          target="_blank"
          rel="noreferrer"
          className="underline hover:opacity-80"
        >
          NRCS gSSURGO database
        </a>
        . I joined <code>Muaggatt</code> attributes to <code>MUPOLYGON</code> polygons through <code>MUKEY</code>, projected to NAD 83 / UTM 18N,
        and clipped to the county boundary. Drainage classes were rasterized and collapsed into two suitability tiers for the AEZ model.
      </p>
      <SoilReclassTable />
      <figure className="pt-4">
        <Image
          src="/soil.png"
          alt="Tompkins County soil‑drainage suitability map"
          width={200}
          height={200}
          className="h-auto w-full rounded-lg border "
        />
        <figcaption className="mt-2 text-sm text-white/70">
          Soil‑drainage suitability: <span className="font-semibold">Light blue</span> = Class 1 (poor to moderate); <span className="font-semibold">Dark blue</span> = Class 2 (well‑drained).
        </figcaption>
      </figure>
    </section>

    {/* LULC Section */}
    <section id="lulc" className="space-y-6">
      <h2 className="text-2xl font-semibold">Land‑Use / Land‑Cover (LULC)</h2>
      <p className="leading-relaxed">
        The 2019 NLCD land‑cover layer was downloaded from the&nbsp;
        <a
          href="https://cugir.library.cornell.edu/catalog/cugir-009031"
          target="_blank"
          rel="noreferrer"
          className="underline hover:opacity-80"
        >
          CUGIR catalog
        </a>
        , clipped to the Tompkins County boundary, and re‑projected to NAD 83 / UTM 18N for consistency. I focused on six thematic
        classes—Agriculture, Extraction, Forest, Water Resources, Developed, and Outdoor Recreation—assigning integer codes 1‑6
        alphabetically to streamline raster math. Summary stats reveal a predominantly forest‑agricultural landscape with modest urban
        footprints.
      </p>
      <LulcSummaryTable />
      <figure className="pt-4">
        <Image
          src="/lulc_arc.png"
          alt="Land‑use / land‑cover map for Tompkins County"
          width={700}
          height={500}
          className=" h-auto w-full rounded-lg border "
        />
        <figcaption className="mt-2 text-sm text-white/70">Land‑use / land‑cover distribution across Tompkins County (NLCD 2019).</figcaption>
      </figure>
    </section>

    {/* GDD Section */}
    <section id="gdd" className="space-y-6">
      <h2 className="text-2xl font-semibold">Growing Degree Days (GDD)</h2>
      <p className="leading-relaxed">
        Daily temperature rasters for 2019 were obtained from the&nbsp;
        <a
          href="https://prism.oregonstate.edu/recent/"
          target="_blank"
          rel="noreferrer"
          className="underline hover:opacity-80"
        >
          PRISM Climate Group
        </a>
        . Python scripting automated the calculation of <code>GDD = max(0, ((T<sub>max</sub> + T<sub>min</sub>)/2) – 10 °C)</code> for each day, and
        <strong>Cell Statistics</strong> summed the stack to an annual raster. After standard reprojection, resampling, and clipping, I
        reclassified the grid into two decision‑oriented classes: low‑heat (≤ 2 200 °F‑days) and high‑heat (&gt; 2 200 °F‑days).
      </p>
      <p className="leading-relaxed">
        Cooler pixels cluster along Cayuga Lake and major river corridors, where water bodies moderate temperatures and reduce cumulative
        heat units—a key insight for crop‑planning near shoreline microclimates.
      </p>
      <figure className="pt-4">
        <Image
          src="/gdd.png"
          alt="2019 GDD classification for Tompkins County"
          width={100}
          height={100}
          className="h-auto w-full rounded-lg border"
        />
        <figcaption className="mt-2 text-sm text-white/70">
          GDD 2019: <span className="font-semibold text-yellow-300">Yellow</span> = ≤ 2 200 °F‑days; <span className="font-semibold text-red-400">Red</span> = &gt; 2 200 °F‑days.
        </figcaption>
      </figure>
    </section>
    <section id="dem" className="space-y-6 pt-8">
      <h2 className="text-2xl font-semibold">Terrain & Topography</h2>
      <p className="leading-relaxed">
        One‑arc‑second elevation tiles (≈ 30 m) from the USGS <em>3DEP</em> program were mosaicked in ArcGIS Pro via
        <code>Mosaic To New Raster</code> (LZW compression), clipped to state boundaries, and projected to
        <strong>NAD 83 / UTM 18N</strong>. A subsequent county mask yielded <code>TC_DEM_10m.tif</code>, the master surface for all
        terrain derivatives.
      </p>
      <ul className="list-disc space-y-1 pl-6 text-sm">
        <li><strong>Contours</strong> — 10 m intervals for QC & cartography.</li>
        <li><strong>Aspect</strong> — reclassified into eight compass sectors; pixel counts support microclimate & solar‑siting studies.</li>
        <li><strong>Slope</strong> — generated in degrees and collapsed into five stability/erosion classes:<br />
          0–4°, 4–16°, 16–32°, 32–64°, 64–90°.</li>
        <li><strong>Composite Queries</strong> — Raster Calculator intersections (e.g., south‑facing & moderately steep) verified with
          <code>Frequency</code> statistics.</li>
      </ul>
      <p className="leading-relaxed">
        The result is a concise, analysis‑ready topographic suite that integrates seamlessly with GDD, soil, and land‑cover layers for
        holistic suitability modeling.
      </p>
      <figure className="pt-4">
        <Image
          src="/dem.png"
          alt="Slope and aspect classifications for Tompkins County"
          width={500}
          height={550}
          className="h-auto w-full rounded-lg border "
        />
        <figcaption className="mt-2 text-sm text-white/70">
          Topographic derivatives: five‑class slope (hue) overlaid with eight‑sector aspect arrows (vector layer).
        </figcaption>
      </figure>
    </section>
    {/* ───────────────────── Unique Natural Areas (UNA) Section ───────────────────── */}
<section id="una" className="space-y-6">
  <h2 className="text-2xl font-semibold">Unique Natural Areas (UNA)</h2>

  <p className="leading-relaxed">
    Authoritative polygons were downloaded from the&nbsp;
    <a
      href="https://www.arcgis.com/home/item.html?id=fd7a584a233946a0ace76093866e64b6"
      target="_blank"
      rel="noreferrer"
      className="underline hover:opacity-80"
    >
      Tompkins County ArcGIS Online UNA layer
    </a>
    . After projecting to <strong>NAD 83 / UTM 18N</strong> and clipping to the county
    boundary, I generated a 100 m buffer to comply with local conservation guidance. These
    buffered UNAs act as exclusion zones in the biosuitability model.
  </p>

  {/* UNA map */}
  <figure className="pt-4">
    <Image
      src="/una.png"      /* ← replace with your file path */
      alt="Unique Natural Areas and 100 m buffers"
      width={768}
      height={550}
      className="h-auto w-full rounded-lg border"
    />
    <figcaption className="mt-2 text-sm text-white/70">
      Unique Natural Areas (dark outline) with 100 m protective buffer (shaded).
    </figcaption>
  </figure>
</section>
{/* ───────────────────── Agro-Ecological Zones (AEZ) Section ───────────────────── */}
<section id="aez" className="space-y-6">
  <h2 className="text-2xl font-semibold">Agro-Ecological Zones (AEZ)</h2>

  <p className="leading-relaxed">
    AEZs integrate climate and soil constraints to rank agricultural potential.  
    I combined the <strong>GDD</strong> raster (Class&nbsp;1 ≤ 2 200 °F-days, Class&nbsp;2 &gt; 2 200 °F-days)  
    with the <strong>soil-drainage</strong> raster (Class&nbsp;1 = poor, Class&nbsp;2 = good) in ArcGIS Pro’s Raster Calculator:
  </p>

  <pre className="bg-white/10 p-4 text-sm overflow-x-auto">
{`AEZ = 1  if  (GDD_class = 1) & (SD_class = 1)
AEZ = 2  if  (GDD_class = 2) & (SD_class = 1)
AEZ = 3  if  (GDD_class = 1) & (SD_class = 2)
AEZ = 4  if  (GDD_class = 2) & (SD_class = 2)`}
  </pre>

  <p className="leading-relaxed">
    The four-tier grid ranges from least suitable (cool + poorly drained) to most favorable
    (warm + well-drained), streamlining downstream cost-benefit and zoning analyses.
  </p>

  {/* AEZ map */}
  <figure className="pt-4">
    <Image
      src="/aez.png"      /* ← replace with your file path */
      alt="Tompkins County Agro-Ecological Zones"
      width={768}
      height={550}
      className="h-auto w-full rounded-lg border border-white/20"
    />
    <figcaption className="mt-2 text-sm text-white/70">
      AEZ classes: 1 = cool / poor drainage, 4 = warm / well-drained (highest suitability).
    </figcaption>
  </figure>
</section>
{/* ───────────────────── Biosuitability Section ───────────────────── */}
<section id="biosuitability" className="space-y-6">
  <h2 className="text-2xl font-semibold">Biosuitability Analysis</h2>

  <p className="leading-relaxed">
    Biosuitability pinpoints where ecological conditions and land-use constraints overlap to
    favor habitat restoration or conservation plantings. I intersected three rasters—each
    on a 10&nbsp;m NAD 83 / UTM 18N grid and integer-coded—for a transparent, reproducible
    Boolean overlay:
  </p>

  <ul className="list-disc space-y-1 pl-6 text-sm">
    <li><strong>LULC Class 1</strong> — natural / semi-natural cover with high restoration potential.</li>
    <li><strong>UNA Buffer</strong> — value 0 outside the 100 m exclusion zone around Unique Natural Areas.</li>
    <li><strong>Slope ≤ 8.5°</strong> — gently rolling terrain suitable for planting and low erosion risk.</li>
  </ul>

  <pre className="bg-white/10 p-4 text-sm overflow-x-auto">
{`Biosuitable = (LULC == 1) &
               (Buffer_raster == 0) &
               (Slope <= 8.5)`}
  </pre>

  <p className="leading-relaxed">
    Multiplying these binary rasters yields a final grid where <code>1</code> highlights pixels meeting
    <em>all three</em> criteria—prime candidates for restoration—while <code>0</code> denotes unsuitable
    areas. The approach is fast, auditable, and directly informs land-management priorities.
  </p>

  {/* Biosuitability map */}
  <figure className="pt-4">
    <Image
      src="/biosuit.png"   /* ← replace with your file path */
      alt="Biosuitability map for Tompkins County"
      width={768}
      height={550}
      className="h-auto w-full rounded-lg border border-white/20"
    />
    <figcaption className="mt-2 text-sm text-white/70">
      Biosuitable pixels (highlighted) satisfy land-cover, slope, and conservation-setback criteria.
    </figcaption>
  </figure>
</section>
{/* ───────────────────── Final Suitability Surface ───────────────────── */}
<section id="suitability" className="space-y-6">
  <h2 className="text-2xl font-semibold">Composite Suitability Map</h2>

  <p className="leading-relaxed">
    To deliver a single, decision-ready surface, I multiplied the <strong>Agro-Ecological Zone (AEZ)</strong> raster by the
    <strong> Biosuitability</strong> raster in ArcGIS Pro’s <em>Raster Calculator</em>. Both layers share the same 10 m grid,
    so each cell-by-cell product acts as a logical mask:
  </p>

  <ul className="list-disc space-y-1 pl-6 text-sm">
    <li><strong>Biosuitability</strong> — binary (1 = passes all ecological criteria, 0 = fails any).</li>
    <li><strong>AEZ</strong> — ranked 1–4 (1 = least, 4 = most favorable for agriculture).</li>
  </ul>

  <pre className="bg-white/10 p-4 text-sm overflow-x-auto">
{`FinalSuit = AEZ * Biosuitability`}
  </pre>

  <p className="leading-relaxed">
    The result retains AEZ scores only where biosuitability = 1; all other pixels revert to 0. Higher values (2–4) therefore spotlight
    land that is <em>both</em> biologically appropriate <em>and</em> increasingly advantageous for agriculture—an essential filter for zoning
    and cost-benefit decisions.
  </p>

  {/* Final suitability map */}
  <figure className="pt-4">
    <Image
      src="/suitability.png"  
      alt="Composite suitability map for Tompkins County"
      width={768}
      height={550}
      className="h-auto w-full rounded-lg border border-white/20"
    />
    <figcaption className="mt-2 text-sm text-white/70">
      Composite suitability (0 = masked; 1–4 = increasing agricultural potential within ecologically viable areas).
    </figcaption>
  </figure>
</section>


    {/* Placeholder for subsequent AEZ & biosuitability sections */}
  </article>
);

export default BlogPost;
