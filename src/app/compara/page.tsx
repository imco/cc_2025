"use client"
import { Suspense } from "react"

import Compare from "@/components/compare/compare.component"

export default function Page() {
  return (
    <Suspense>
      <Compare />
    </Suspense>
  )
}
