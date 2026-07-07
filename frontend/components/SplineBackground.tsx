"use client";

import { Suspense } from "react";
import Spline from "@splinetool/react-spline/next";

export default function SplineBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <Suspense fallback={
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/20 to-transparent animate-pulse" />
      }>
        <Spline
          scene="https://prod.spline.design/SxhOPKt5L7pPqxaK/scene.splinecode"
          className="w-full h-full"
        />
      </Suspense>
    </div>
  );
}
