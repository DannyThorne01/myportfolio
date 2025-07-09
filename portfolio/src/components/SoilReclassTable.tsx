// SoilReclassTable.tsx
"use client";

import React from "react";

const rows = [
  ["Somewhat excessively drained", 0, 1],
  ["Well drained", 1, 2],
  ["Moderately well drained", 2, 2],
  ["Somewhat poorly drained", 3, 1],
  ["Poorly drained", 4, 1],
  ["Very poorly drained", 5, 1],
] as const;

/**
 * High‑contrast, dark‑theme table for soil‑drainage reclassification.
 */
const SoilReclassTable: React.FC = () => (
  <table className="w-full table-fixed border-collapse text-sm">
    <thead className="bg-white/10">
      <tr>
        <th className="px-3 py-2 text-left font-semibold text-white">Soil‑drainage class</th>
        <th className="px-3 py-2 text-right font-semibold text-white">Burn‑in</th>
        <th className="px-3 py-2 text-right font-semibold text-white">Reclass</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-white/20">
      {rows.map(([label, burn, rec]) => (
        <tr key={label} className="hover:bg-white/5">
          <td className="px-3 py-2 text-white/90 whitespace-nowrap">{label}</td>
          <td className="px-3 py-2 text-right text-white/70">{burn}</td>
          <td className="px-3 py-2 text-right text-white/70">{rec}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SoilReclassTable;
