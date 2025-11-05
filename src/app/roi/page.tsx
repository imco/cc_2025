"use client";

import { Suspense } from "react";
import RoiSelector from "../../components/roi/roi-selector.component";

export default function RoiPage() {
  return (
    <Suspense>
      <RoiSelector />
    </Suspense>
  );
}
