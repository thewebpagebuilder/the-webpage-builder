"use client";

import dynamic from "next/dynamic";

export const FloatingCoderSection = dynamic(() => import("@/components/3d/FloatingCoder").then(mod => mod.FloatingCoderSection), { ssr: false });
export const DevObjects3D = dynamic(() => import("@/components/3d/DevObjects3D").then(mod => mod.DevObjects3D), { ssr: false });
export const TechOrbit = dynamic(() => import("@/components/3d/TechOrbit").then(mod => mod.TechOrbit), { ssr: false });
export const InteractiveTerminal3D = dynamic(() => import("@/components/3d/InteractiveTerminal3D").then(mod => mod.InteractiveTerminal3D), { ssr: false });
