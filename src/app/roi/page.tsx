"use client";

import { Suspense } from "react";
import RoiSelector from "../../components/roi/roi-selector.component";
export { metadata } from "./metadata";

export default function RoiPage() {
  return (
    <Suspense>
      <RoiSelector />
    </Suspense>
  );
}
