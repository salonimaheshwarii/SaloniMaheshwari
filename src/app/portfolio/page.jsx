"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpaceScene from "../components/SpaceScene";
import Navigation from "../components/Navigation";
import LoadingScreen from "../components/LoadingScreen";
import SectionContent from "../components/SectionContent";
import ClientOnly from "../components/ClientOnly";

const sections = [
  { id: "home", title: "Welcome", planet: "Earth" },
  { id: "about", title: "About", planet: "Mars" },
  { id: "education", title: "Knowledge Station", planet: "Jupiter" },
  { id: "experience", title: "Experience", planet: "Saturn" },
  { id: "projects", title: "Projects", planet: "Neptune" },
  { id: "skills", title: "Skills", planet: "Venus" },
  { id: "achievements", title: "Achievements", planet: "Mercury" },
  { id: "certificates", title: "Certifications", planet: "Uranus" },
  { id: "contact", title: "Communication Hub", planet: "Pluto" },
];

export default function Portfolio3D() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef();
  const currentSectionRef = useRef(0);

  useEffect(() => {
    // Initialize the component
    setIsInitialized(true);
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Keep ref in sync with state
  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  const [isScrolling, setIsScrolling] = useState(false);
  const isScrollingRef = useRef(false);

  const handleScroll = (direction) => {
    if (isScrollingRef.current) {
      console.log("Scroll blocked - already scrolling");
      return; // Prevent rapid scrolling
    }

    console.log(
      `Attempting scroll ${direction} from section ${currentSectionRef.current}`
    );
    isScrollingRef.current = true;
    setIsScrolling(true);

    const current = currentSectionRef.current;

    if (direction === "down" && current < sections.length - 1) {
      const newSection = current + 1;
      currentSectionRef.current = newSection;
      setCurrentSection(newSection);
      console.log(
        `Scrolled down to section ${newSection}: ${sections[newSection]?.title}`
      );
    } else if (direction === "up" && current > 0) {
      const newSection = current - 1;
      currentSectionRef.current = newSection;
      setCurrentSection(newSection);
      console.log(
        `Scrolled up to section ${newSection}: ${sections[newSection]?.title}`
      );
    } else {
      console.log(`Cannot scroll ${direction} - at boundary`);
    }

    // Reset scrolling flag after a delay
    setTimeout(() => {
      isScrollingRef.current = false;
      setIsScrolling(false);
      console.log("Scroll cooldown finished");
    }, 1000);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      // Only handle significant scroll movements
      if (Math.abs(e.deltaY) > 10) {
        if (e.deltaY > 0) {
          handleScroll("down");
        } else {
          handleScroll("up");
        }
      }
    };

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          handleScroll("down");
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          handleScroll("up");
          break;
      }
    };

    const container = containerRef.current;
    if (container && !isLoading) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        container.removeEventListener("wheel", handleWheel);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isLoading]); // Removed currentSection and isScrolling dependencies

  // Don't render anything until initialized
  if (!isInitialized) {
    return <div className="w-full h-screen bg-black" />;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      {!isLoading && (
        <>
          {/* 3D Canvas Background */}
          <div className="absolute inset-0 z-0">
            <ClientOnly fallback={<div className="w-full h-full bg-black" />}>
              <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={null}>
                  <SpaceScene currentSection={currentSection} />
                </Suspense>
              </Canvas>
            </ClientOnly>
          </div>

          {/* Navigation */}
          <Navigation
            sections={sections}
            currentSection={currentSection}
            onSectionChange={setCurrentSection}
          />

          {/* Section Content */}
          {sections[currentSection] && (
            <SectionContent
              key={currentSection} // Force re-render when section changes
              section={sections[currentSection]}
              onProjectClick={setShowModal}
            />
          )}

          {/* Scroll Indicators */}
          <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30">
            {sections.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full mb-4 cursor-pointer border-2 ${
                  index === currentSection
                    ? "bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/50"
                    : "bg-transparent border-gray-400 hover:border-cyan-400"
                }`}
                onClick={() => setCurrentSection(index)}
                whileHover={{ scale: 1.2 }}
                animate={{
                  boxShadow:
                    index === currentSection
                      ? "0 0 20px rgba(34, 211, 238, 0.8)"
                      : "0 0 0px rgba(34, 211, 238, 0)",
                }}
              />
            ))}
          </div>

          {/* Project Modal */}
          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                onClick={() => setShowModal(null)}
              >
                <motion.div
                  initial={{ scale: 0.5, rotateY: -90 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  exit={{ scale: 0.5, rotateY: 90 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="bg-gray-900/90 backdrop-blur-md border border-cyan-400/30 rounded-2xl p-8 max-w-2xl mx-4 shadow-2xl shadow-cyan-400/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                      Project Details
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Project information will be displayed here...
                    </p>
                    <button
                      onClick={() => setShowModal(null)}
                      className="px-6 py-2 bg-cyan-400/20 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/30 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
