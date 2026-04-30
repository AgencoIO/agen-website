'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// --- 3D PARTICLE COMPONENT ---

interface ParticleSwarmProps {
  progress: number;
  itemsCount: number;
}

const ParticleSwarm = ({ progress, itemsCount }: ParticleSwarmProps) => {
  const count = 6000;
  const pointsRef = useRef<THREE.Points>(null!);
  
  // Create initial random positions
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return [pos];
  }, []);

  // Pre-calculate target shapes for morphing
  // 0: Sphere (Default/Idle)
  // 1: Stream (Pipelines)
  // 2: Planes (Dashboards)
  // 3: Tower (Infrastructure)
  const targets = useMemo(() => {
    const t = [];
    
    // State 0: Sphere
    const sphere = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      sphere[i * 3] = 3 * Math.cos(theta) * Math.sin(phi);
      sphere[i * 3 + 1] = 3 * Math.sin(theta) * Math.sin(phi);
      sphere[i * 3 + 2] = 3 * Math.cos(phi);
    }
    t.push(sphere);

    // State 1: Stream (Pipelines)
    const stream = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      stream[i * 3] = (Math.random() - 0.5) * 12; // X
      stream[i * 3 + 1] = Math.sin(stream[i * 3] * 0.5) * 1.5 + (Math.random() - 0.5) * 0.5; // Y
      stream[i * 3 + 2] = (Math.random() - 0.5) * 0.5; // Z
    }
    t.push(stream);

    // State 2: Planes (Dashboards)
    const planes = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const planeIdx = i % 3;
      planes[i * 3] = (Math.random() - 0.5) * 5;
      planes[i * 3 + 1] = (Math.random() - 0.5) * 5 + (planeIdx - 1) * 2;
      planes[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
    }
    t.push(planes);

    // State 3: Tower (Infrastructure)
    const tower = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 2;
      const angle = Math.random() * Math.PI * 2;
      tower[i * 3] = Math.cos(angle) * radius;
      tower[i * 3 + 1] = (Math.random() - 0.5) * 8;
      tower[i * 3 + 2] = Math.sin(angle) * radius;
    }
    t.push(tower);

    return t;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.attributes.position;
    
    // Determine which two states to interpolate between
    const totalStates = targets.length;
    const scaledProgress = progress * (totalStates - 1);
    const index = Math.floor(scaledProgress);
    const nextIndex = Math.min(index + 1, totalStates - 1);
    const weight = scaledProgress - index;

    const currentTarget = targets[index];
    const nextTarget = targets[nextIndex];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Morph between shapes
      const tx = currentTarget[i3] * (1 - weight) + nextTarget[i3] * weight;
      const ty = currentTarget[i3 + 1] * (1 - weight) + nextTarget[i3 + 1] * weight;
      const tz = currentTarget[i3 + 2] * (1 - weight) + nextTarget[i3 + 2] * weight;

      // Add subtle noise/float
      const noise = Math.sin(time * 0.5 + i) * 0.05;
      
      posAttr.setXYZ(
        i,
        tx + noise,
        ty + noise,
        tz + noise
      );
    }
    
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#3b82f6"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// --- MAIN COMPONENT ---

interface WhatWeBuild3DProps {
  data: any;
  items: any[];
}

export default function WhatWeBuild3D({ data, items }: WhatWeBuild3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to item index for HUD content
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      const idx = Math.min(Math.floor(v * items.length), items.length - 1);
      setActiveIndex(idx);
    });
  }, [scrollYProgress, items.length]);

  return (
    <section 
      ref={containerRef} 
      id="what-we-build" 
      className="relative h-[400vh] bg-zinc-950 text-white"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* 3D Scene */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <ParticleSwarm progress={scrollYProgress.get()} itemsCount={items.length} />
          </Canvas>
        </div>

        {/* HUD Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl w-full"
            >
              <div className="space-y-6 text-center">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">
                  {items[activeIndex]?.title || "SYSTEM_ACTIVE"}
                </h2>
                
                <p className="text-lg md:text-xl text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
                  {items[activeIndex]?.description}
                </p>

                {items[activeIndex]?.tags && (
                  <div className="flex flex-wrap justify-center gap-2 pt-4">
                    {items[activeIndex].tags.map((tag: string, i: number) => (
                      <span key={i} className="px-3 py-1 rounded-none bg-white/5 border border-white/20 text-[10px] font-mono text-white uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-wrap justify-center gap-4 pt-8 pointer-events-auto">
                  {items[activeIndex]?.primaryCtaLabel && (
                    <Button asChild size="lg" className="rounded-none bg-transparent border border-white text-white hover:bg-white/10 transition-all duration-300 px-8">
                      <Link href={items[activeIndex].primaryCtaLink || "#"}>
                        {items[activeIndex].primaryCtaLabel}
                      </Link>
                    </Button>
                  )}
                  {items[activeIndex]?.secondaryCtaLabel && (
                    <Button asChild variant="outline" size="lg" className="rounded-none border border-white bg-transparent text-white hover:bg-white/10 transition-all duration-300 px-8">
                      <Link href={items[activeIndex].secondaryCtaLink || "#"}>
                        {items[activeIndex].secondaryCtaLabel}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {items.map((_, i) => (
              <div 
                key={i}
                className={`h-1 transition-all duration-500 ${i === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-zinc-800'}`}
              />
            ))}
          </div>
        </div>
        
        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] z-50" />
      </div>
    </section>
  );
}
