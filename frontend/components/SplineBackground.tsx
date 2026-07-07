"use client";

import { Suspense } from "react";
import Spline from "@splinetool/react-spline";

export default function SplineBackground() {
  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{
        zIndex: 0,
        backgroundColor: '#001031',
      }}
    >
      <Suspense fallback={
        <div 
          className="w-full h-full animate-pulse" 
          style={{ backgroundColor: '#001031' }}
        />
      }>
        <Spline
          scene="https://prod.spline.design/SxhOPKt5L7pPqxaK/scene.splinecode"
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />
      </Suspense>
    </div>
  );
}