"use client";

import { Suspense } from "react";
import Spline from "@splinetool/react-spline";

export default function SplineBackground() {
  // Using standard Spline import for client-side compatibility
  return (
    <div 
      className="fixed inset-0 w-full h-full"
      style={{
        zIndex: 0,
        backgroundColor: '#0D0D31', // Match your Spline BG color
      }}
    >
      <Suspense fallback={
        <div 
          className="w-full h-full animate-pulse" 
          style={{ backgroundColor: '#0D0D31' }}
        />
      }>
        <Spline
          scene="https://prod.spline.design/SxhOPKt5L7pPqxaK/scene.splinecode"
          style={{
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',
          }}
          onLoad={(spline) => {
            // Lock camera at initial position - prevent zoom animations
            if (spline && spline.camera) {
              // Store the initial camera position
              const camera = spline.camera;
              camera.enableZoom = false;
              camera.enablePan = false;
              camera.enableRotate = false;
            }
          }}
        />
      </Suspense>
    </div>
  );
}
