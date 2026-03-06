"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// Enhanced custom cursor with particle effects
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Create particle trail effect
      if (Math.random() > 0.7) {
        setParticles((prev) => [
          ...prev,
          {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 1,
          },
        ]);
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Particle animation loop
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            life: p.life - 0.02,
            x: p.x + p.vx,
            y: p.y + p.vy,
          }))
          .filter((p) => p.life > 0)
      );
    }, 16);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 8),
          y: mousePosition.y - (isHovering ? 20 : 8),
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white transition-colors duration-200 ${
            isHovering
              ? "bg-gradient-to-r from-pink-400 to-orange-400"
              : "bg-white"
          }`}
        />
      </motion.div>

      {/* Particle trail */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-40 w-1 h-1 rounded-full bg-gradient-to-r from-pink-400 to-orange-400"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.life,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: particle.life }}
        />
      ))}
    </>
  );
};

// Floating background elements with parallax
const BackgroundElements = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -150]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border-2 border-pink-300/30 rounded-full"
        style={{ y: y1 }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-orange-300/20 to-yellow-300/20 rounded-lg"
        style={{ y: y2 }}
        animate={{
          rotate: [360, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-40 left-20 w-12 h-12 border-2 border-teal-300/30 transform rotate-45"
        style={{ y: y3 }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Animated dots */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.6, 0.2, 0.6],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Gamified progress bar
const ProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

// Enhanced Navigation with animations
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.9)"]
  );

  const navItems = ["About", "Projects", "Experience", "Skills", "Contact"];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 hidden lg:block"
        style={{ backgroundColor }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Saloni Maheshwari
            </motion.div>

            <div className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-pink-500 transition-colors relative group"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-orange-400 transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}

              <motion.button
                className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Talk
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <motion.button
          className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 text-white"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-40 bg-gradient-to-br from-pink-400 via-orange-400 to-yellow-400"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-3xl font-bold text-white hover:text-gray-100"
                    initial={{ opacity: 0, y: 20, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// 3D Models component that changes on scroll
const Scroll3DModels = () => {
  const { scrollYProgress } = useScroll();
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  // Interesting facts about Saloni that change on scroll
  const facts = [
    "👩‍💻 Software Engineer at EY GDS",
    "⚡ 2+ years experience across multiple frameworks",
    "💻 Expert in React, Angular & Vue.js with modern web technologies",
    "🌍 Active open-source contributor to projects like Clipify and KeepNote",
    "🎤 Speaker at tech events including Angular 101 (2025)",
    "🛠 Skilled in GitHub Actions, CI/CD pipelines, and Terraform",
    "📦 Built Chrome extensions for enhanced browser functionality",
    "📊 Worked with PrimeNG and building dynamic, responsive UIs",
    "🚀 Passion for clean, optimized code and scalable solutions",
    "✨ Loves exploring new tech trends and emerging technologies",
  ];

  // Define different 3D models for different scroll positions
  const models = [
    { icon: "🚀", name: "Rocket", description: "Launching into tech" },
    { icon: "⚛️", name: "React", description: "Building interfaces" },
    { icon: "☁️", name: "Cloud", description: "Scalable solutions" },
    { icon: "🐳", name: "Docker", description: "Containerized apps" },
    { icon: "🔧", name: "Tools", description: "Development stack" },
    { icon: "💻", name: "Code", description: "Clean & efficient" },
    { icon: "⚡", name: "Performance", description: "Optimized solutions" },
    { icon: "🎯", name: "Target", description: "Goal-oriented approach" },
  ];

  const currentModelIndex = useTransform(
    scrollYProgress,
    [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
    [0, 1, 2, 3, 4, 5, 6, 7, 7]
  );

  // Update facts based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const factIndex = Math.floor(latest * facts.length);
      setCurrentFactIndex(Math.min(factIndex, facts.length - 1));
    });

    return unsubscribe;
  }, [scrollYProgress, facts.length]);

  return (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
      <div className="relative">
        {/* Current 3D Model */}
        <motion.div
          className="w-24 h-24 bg-gradient-to-br from-pink-400 via-orange-400 to-yellow-400 rounded-2xl shadow-2xl flex items-center justify-center text-4xl relative overflow-hidden"
          style={{
            rotateY: useTransform(currentModelIndex, (value) => value * 45),
            rotateX: useTransform(currentModelIndex, (value) => value * 30),
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotateZ: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)`,
              backgroundSize: "200% 200%",
            }}
          />

          <motion.div
            key={Math.floor(
              useTransform(currentModelIndex, (value) => value).get()
            )}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            {
              models[
                Math.floor(
                  useTransform(currentModelIndex, (value) => value).get()
                )
              ]?.icon
            }
          </motion.div>
        </motion.div>

        {/* Enhanced Tooltip with Facts */}
        <motion.div
          className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-200 min-w-[220px] max-w-[260px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            key={currentFactIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Current Model Info */}
            {/* <div className="mb-3 pb-3 border-b border-gray-200">
              <h4 className="font-bold text-gray-800 text-sm">
                {models[Math.floor(useTransform(currentModelIndex, (value) => value).get())]?.name}
              </h4>
              <p className="text-xs text-gray-600">
                {models[Math.floor(useTransform(currentModelIndex, (value) => value).get())]?.description}
              </p>
            </div> */}

            {/* Facts Section */}
            <div>
              <div className="flex items-center mb-3">
                <motion.span
                  className="text-lg mr-2"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  💡
                </motion.span>
                <span className="text-xs font-semibold text-pink-600 uppercase tracking-wide">
                  Few More Facts
                </span>
              </div>

              {/* Current Fact */}
              <div className="mb-3">
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  {facts[currentFactIndex]}
                </p>
              </div>

              {/* Progress indicator */}
              <div className="flex space-x-1 mb-2">
                {facts.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1.5 rounded-full ${
                      index <= currentFactIndex
                        ? "bg-gradient-to-r from-pink-400 to-orange-400"
                        : "bg-gray-200"
                    }`}
                    animate={{
                      scale: index === currentFactIndex ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ width: `${100 / facts.length}%` }}
                  />
                ))}
              </div>

              {/* Fact counter */}
              <div className="text-xs text-gray-500 text-center">
                Fact {currentFactIndex + 1} of {facts.length}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator dots */}
        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 space-y-2">
          {models.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${
                Math.floor(
                  useTransform(currentModelIndex, (value) => value).get()
                ) === index
                  ? "bg-pink-500"
                  : "bg-gray-300"
              }`}
              animate={{
                scale:
                  Math.floor(
                    useTransform(currentModelIndex, (value) => value).get()
                  ) === index
                    ? 1.5
                    : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced Hero section with 3D character
const Hero = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [characterState, setCharacterState] = useState("idle");

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCharacterClick = () => {
    setCharacterState(characterState === "idle" ? "excited" : "idle");
    setTimeout(() => setCharacterState("idle"), 2000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      <BackgroundElements />

      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10px",
                background: [
                  "#f472b6",
                  "#fb923c",
                  "#fbbf24",
                  "#14b8a6",
                  "#3b82f6",
                  "#8b5cf6",
                ][Math.floor(Math.random() * 6)],
              }}
              animate={{
                y: [0, window.innerHeight + 100],
                x: [0, (Math.random() - 0.5) * 200],
                rotate: [0, 360],
                scale: [1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Enhanced 3D Tech Character */}
        <motion.div
          className="mb-8 cursor-pointer relative inline-block"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCharacterClick}
        >
          {/* Main 3D Character Container */}
          <motion.div
            className="relative w-32 h-32 md:w-40 md:h-40"
            style={{ perspective: 1000 }}
            animate={{
              rotateY:
                characterState === "excited" ? [0, 360, 0] : [0, 5, -5, 0],
              rotateX:
                characterState === "excited" ? [0, 15, 0] : [0, 10, -10, 0],
              scale: characterState === "excited" ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: characterState === "excited" ? 1 : 4,
              repeat: characterState === "excited" ? 1 : Infinity,
              ease: "easeInOut",
            }}
          >
            {/* 3D Tech Character */}
            <div className="w-full h-full relative transform-style-preserve-3d">
              {/* Front Face - Main Character */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-400 via-orange-400 to-yellow-400 rounded-2xl shadow-2xl flex items-center justify-center text-5xl md:text-6xl"
                style={{ transform: "translateZ(20px)" }}
                animate={{
                  y: characterState === "excited" ? [-10, 0, -10] : [0, -5, 0],
                }}
                transition={{
                  duration: characterState === "excited" ? 0.3 : 2,
                  repeat: characterState === "excited" ? 3 : Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    style={{
                      backgroundImage: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)`,
                      backgroundSize: "200% 200%",
                    }}
                  />
                </div>

                {/* Tech-themed character */}
                <div className="relative z-10">
                  <span className="text-4xl md:text-5xl">👩‍💻</span>
                </div>
              </motion.div>

              {/* Right Face - Code */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-400 rounded-2xl shadow-xl flex items-center justify-center text-2xl md:text-3xl"
                style={{ transform: "rotateY(90deg) translateZ(20px)" }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span>💻</span>
              </motion.div>

              {/* Left Face - Cloud */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl shadow-xl flex items-center justify-center text-2xl md:text-3xl"
                style={{ transform: "rotateY(-90deg) translateZ(20px)" }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              >
                <span>☁️</span>
              </motion.div>

              {/* Top Face - React */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl shadow-xl flex items-center justify-center text-2xl md:text-3xl"
                style={{ transform: "rotateX(90deg) translateZ(20px)" }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.75,
                }}
              >
                <span>⚛️</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating tech elements around the 3D character */}
          {["🚀", "⚡", "🔧", "🎯", "💎", "🌟"].map((icon, index) => (
            <motion.div
              key={icon}
              className="absolute text-xl md:text-2xl opacity-70"
              style={{
                left: `${50 + 40 * Math.cos(index * 1.05)}%`,
                top: `${50 + 40 * Math.sin(index * 1.05)}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2 + index * 0.3,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            >
              {icon}
            </motion.div>
          ))}

          {/* Click hint */}
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 opacity-60"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          ></motion.div>
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          SALONI
          <br />
          MAHESHWARI
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Software Engineer | Frontend Developer | Cloud Engineer
          <br />
        </motion.p>

        {/* <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <motion.button
            className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.button>

          <motion.a
            href="#contact"
            className="px-8 py-4 text-lg font-semibold text-gray-700 hover:text-pink-500 transition-colors relative group"
            whileHover={{ y: -2 }}
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-orange-400 transition-all duration-300 group-hover:w-full" />
          </motion.a>
        </motion.div> */}

        {/* Social icons with enhanced animations */}
        <motion.div
          className="flex justify-center space-x-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          {[
            {
              name: "github",
              url: "https://github.com/salonimaheshwarii",
              icon: "🐙",
            },
            {
              name: "linkedin",
              url: "https://linkedin.com/in/saloni-maheshwari-756830/",
              icon: "💼",
            },
            {
              name: "email",
              url: "mailto:salonimaheshwari2113@gmail.com",
              icon: "📧",
            },
          ].map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-pink-500 transition-colors relative overflow-hidden group"
              whileHover={{ scale: 1.1, rotate: 5, y: -5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-400 to-orange-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <span className="text-xl relative z-10 group-hover:text-white transition-colors duration-300">
                {social.icon}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced About section with interactive elements
const About = () => {
  const capabilities = [
    "React.js",
    "Next.js",
    "Full-Stack Development",
    'Angular',
    "AWS",
    "Docker",
    "Cloud Migration",
    "Terraform",
    'Github Actions'
  ];
  const [selectedCapability, setSelectedCapability] = useState(null);

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-gray-50 to-pink-50 relative overflow-hidden"
    >
      {/* Reduced animated background */}
      <div className="absolute inset-0 opacity-15">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(251, 146, 60, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* 3D floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotateX: [0, 180, 360],
              rotateY: [0, 180, 360],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          >
            {/* 3D Cube */}
            <div className="w-8 h-8 relative transform-style-preserve-3d">
              <div
                className="absolute inset-0 bg-gradient-to-br from-pink-200/60 to-orange-200/60 rounded-sm"
                style={{ transform: "translateZ(4px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-pink-200/60 to-orange-200/60 rounded-sm"
                style={{ transform: "translateZ(-4px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-pink-200/60 to-orange-200/60 rounded-sm"
                style={{ transform: "rotateY(90deg) translateZ(4px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-pink-200/60 to-orange-200/60 rounded-sm"
                style={{ transform: "rotateY(-90deg) translateZ(4px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-pink-200/60 to-orange-200/60 rounded-sm"
                style={{ transform: "rotateX(90deg) translateZ(4px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-pink-200/60 to-orange-200/60 rounded-sm"
                style={{ transform: "rotateX(-90deg) translateZ(4px)" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-purple-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-xl text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              🌟 Hi, I’m Saloni Maheshwari — a Software Engineer at EY who loves
              turning complex ideas into simple, beautiful, and functional web
              experiences. With 2+ years of frontend magic ✨ in React, Angular,
              and Vue, I specialize in building clean, optimized, and
              user-friendly applications.
            </motion.p>

            <motion.p
              className="text-xl text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              When I’m not pushing pixels or debugging that “one last issue” 🐞,
              you’ll find me contributing to open-source, exploring new tools
              like GitHub Actions & Terraform, or sharing knowledge on stage
              (yes, I gave an Angular 101 talk at Redefine Possible 2025 🎤). I
              enjoy crafting code that not only works but feels good to use —
              because great tech should be as delightful as it is powerful 🚀
            </motion.p>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">
                What I love building:
              </h3>
              <div className="flex flex-wrap gap-3">
                {capabilities.map((capability, index) => (
                  <motion.span
                    key={capability}
                    className={`px-4 py-2 rounded-full font-medium border cursor-pointer transition-all duration-300 ${
                      selectedCapability === capability
                        ? "bg-gradient-to-r from-pink-400 to-orange-400 text-white border-pink-400 scale-110"
                        : "bg-gradient-to-r from-pink-100 to-orange-100 text-gray-700 border-pink-200 hover:border-pink-400"
                    }`}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() =>
                      setSelectedCapability(
                        selectedCapability === capability ? null : capability
                      )
                    }
                  >
                    {capability}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* <motion.div
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 font-medium border border-teal-200 cursor-pointer"
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              🏆 Smart India Hackathon 2022 Winner - Department of Science &
              Technology
            </motion.div> */}
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Enhanced character representation with multiple elements */}
              <motion.div
                className="w-80 h-80 mx-auto rounded-full bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 p-1"
                whileHover={{ scale: 1.05, rotate: 5 }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(236, 72, 153, 0.4)",
                    "0 0 0 20px rgba(236, 72, 153, 0)",
                    "0 0 0 0 rgba(236, 72, 153, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative overflow-hidden">
                  {/* Main character */}
                  <motion.div
                    className="text-6xl relative z-10"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    👩‍💻
                  </motion.div>

                  {/* Floating tech icons around the character */}
                  {["⚛️", "☁️", "🐳", "🔧", "🚀"].map((icon, index) => (
                    <motion.div
                      key={icon}
                      className="absolute text-2xl"
                      style={{
                        left: `${50 + 30 * Math.cos(index * 1.2)}%`,
                        top: `${50 + 30 * Math.sin(index * 1.2)}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2 + index * 0.5,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    >
                      {icon}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced floating shapes with tech theme */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute rounded-full ${
                    i % 2 === 0
                      ? "bg-gradient-to-r from-teal-400 to-blue-400"
                      : "bg-gradient-to-r from-pink-400 to-orange-400"
                  }`}
                  style={{
                    width: `${8 + i * 2}px`,
                    height: `${8 + i * 2}px`,
                    top: `${15 + i * 12}%`,
                    left: i % 2 === 0 ? "8%" : "87%",
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Projects section with subtle background and 3D card effects
const Projects = () => {
  const projects = [
    {
      title: "Clipify",
      description:
        "Contributed as a frontend designer and developer to Clipify, an open-source, cross-device data sharing tool focused on privacy and simplicity.",
      tags: ["HTML", "Go", "Frontend Design", "Cross-Device Connection"],
      gradient: "from-pink-400 to-orange-400",
      thumbnail: "📋",
      github: "https://github.com/lovepurohit/clipify",
    },
    {
      title: "KeepNote WebApp",
      description:
        "Feature-rich Google Keep clone that provides a robust note-taking solution with responsive UI for creating, editing, and organizing notes effortlessly.",
      tags: ["React.js", "Context API", "Responsive Design", "Note-taking"],
      gradient: "from-teal-400 to-blue-400",
      thumbnail: "📝",
      github: "https://github.com/salonimaheshwarii/Google-Keep-Clone",
    },
    // {
    //   title: "MERN Stack Applications",
    //   description:
    //     "Explored MERN stack for full-stack web development, creating robust applications with modern web technologies.",
    //   tags: [".Net", "SQL", "React.js"],
    //   gradient: "from-blue-400 to-purple-400",
    //   thumbnail: "🚀",
    //   github: "https://github.com/salonimaheshwarii/Travalecious",
    // },
    {
      title: "WebShot Chrome Extension",
      description:
        "Developed Chrome extensions to capture full-page screenshots, enhancing user productivity with seamless web capture functionality.",
      tags: ["Chrome Extensions", "JavaScript", "Browser APIs", "Productivity"],
      gradient: "from-green-400 to-teal-400",
      thumbnail: "🔌",
      github: "https://github.com/salonimaheshwarii/WebShot",
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden"
    >
      {/* Reduced animated background */}
      <div className="absolute inset-0 opacity-18">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.12) 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, rgba(251, 146, 60, 0.12) 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, rgba(20, 184, 166, 0.12) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* 3D floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 18}%`,
              top: `${15 + i * 18}%`,
            }}
            animate={{
              y: [0, -35, 0],
              rotateX: [0, 180, 360],
              rotateY: [0, 180, 360],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 7 + i,
              repeat: Infinity,
              delay: i * 1,
            }}
          >
            {/* 3D Pyramid */}
            <div className="w-10 h-10 relative transform-style-preserve-3d">
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-indigo-200/50 rounded-sm"
                style={{ transform: "translateZ(5px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-indigo-200/50 rounded-sm"
                style={{ transform: "translateZ(-5px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-indigo-200/50 rounded-sm"
                style={{ transform: "rotateY(90deg) translateZ(5px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-indigo-200/50 rounded-sm"
                style={{ transform: "rotateY(-90deg) translateZ(5px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-indigo-200/50 rounded-sm"
                style={{ transform: "rotateX(90deg) translateZ(5px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-indigo-200/50 rounded-sm"
                style={{ transform: "rotateX(-90deg) translateZ(5px)" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              style={{ perspective: 1000 }}
            >
              <motion.div
                className={`h-32 bg-gradient-to-r ${project.gradient} flex items-center justify-center text-6xl relative overflow-hidden`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    style={{
                      backgroundImage: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)`,
                      backgroundSize: "200% 200%",
                    }}
                  />
                </div>
                {project.thumbnail}
              </motion.div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 font-medium"
                      whileHover={{ scale: 1.1, rotate: 2 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 text-white font-semibold hover:from-pink-500 hover:to-orange-500 transition-all duration-300 text-center block"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View on GitHub
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Experience section with timeline animations
const Experience = () => {
  const experiences = [
    {
      role: "Software Engineer",
      company: "EY GDS",
      period: "Dec 2024 - Present",
      description:
        "Contributing to cloud migration to AWS, leveraging Docker, CI/CD pipelines, and Terraform to ensure efficient deployment and optimized infrastructure performance.",
      tools: ["AWS", "Docker", "CI/CD", "Terraform", "Cloud Migration"],
      impact: [
        "Built cloud operations platform frontend",
        "Delivered dynamic UI for multi-cloud management",
        "Optimized infrastructure performance",
      ],
    },
    {
      role: "Junior Cloud Engineer",
      company: "Kansocloud",
      period: "July 2023 - Dec 2024",
      description:
        "Developed dynamic web applications using React.js, Redux Toolkit, and Next.js, and led a full UI redesign of a Vue.js project to enhance usability and user experience.",
      tools: ["React.js", "Redux Toolkit", "Next.js", "Vue.js", "AWS"],
      impact: [
        "Built reliable backend solutions using AWS",
        "Contributed to CI/CD pipelines",
        "Led UI redesign for better UX",
      ],
    },
    {
      role: "Web Developer",
      company: "Lakebrains Technologies",
      period: "April 2023 - July 2023",
      description:
        "Proficient in React.js and Chrome extensions, delivering dynamic web experiences. Explored MERN stack for full-stack web development.",
      tools: ["React.js", "Chrome Extensions", "MERN Stack", "JavaScript"],
      impact: [
        "Delivered dynamic web experiences",
        "Explored full-stack development",
        "Built Chrome extensions",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-br from-gray-50 via-teal-50 to-blue-50 relative overflow-hidden"
    >
      {/* Reduced animated background */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(236, 72, 153, 0.18) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(251, 146, 60, 0.18) 0%, transparent 50%),
                             radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.18) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* 3D floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${12 + i * 14}%`,
              top: `${18 + i * 12}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotateX: [0, 180, 360],
              rotateY: [0, 180, 360],
              scale: [1, 1.2, 1],
              opacity: [0.25, 0.6, 0.25],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.7,
            }}
          >
            {/* 3D Sphere-like element */}
            <div className="w-6 h-6 relative transform-style-preserve-3d">
              <div
                className="absolute inset-0 bg-gradient-to-br from-teal-200/40 to-blue-200/40 rounded-full"
                style={{ transform: "translateZ(3px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-teal-200/40 to-blue-200/40 rounded-full"
                style={{ transform: "translateZ(-3px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-teal-200/40 to-blue-200/40 rounded-full"
                style={{ transform: "rotateY(90deg) translateZ(3px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-teal-200/40 to-blue-200/40 rounded-full"
                style={{ transform: "rotateY(-90deg) translateZ(3px)" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-purple-400 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-400 via-orange-400 to-yellow-400"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role}
                className="relative flex items-start"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Animated timeline node */}
                <motion.div
                  className="absolute left-6 w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 border-4 border-white shadow-lg z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
                  whileHover={{ scale: 1.5, rotate: 180 }}
                />

                <motion.div
                  className="ml-16 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex-1"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {exp.role}
                    </h3>
                    <span className="text-lg text-gray-600 font-medium">
                      {exp.period}
                    </span>
                  </div>

                  <h4 className="text-xl text-pink-600 font-semibold mb-3">
                    {exp.company}
                  </h4>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-700 mb-2">
                      Key Tools & Technologies:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.tools.map((tool, toolIndex) => (
                        <motion.span
                          key={tool}
                          className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700 font-medium"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + toolIndex * 0.1 }}
                          whileHover={{ scale: 1.1, rotate: 2 }}
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2">
                      Key Achievements:
                    </h5>
                    <ul className="space-y-1">
                      {exp.impact.map((item, i) => (
                        <motion.li
                          key={i}
                          className="text-gray-600 flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + i * 0.1 }}
                        >
                          <span className="text-pink-500 mr-2">•</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Skills section with interactive elements
const Skills = () => {
  const skillCategories = [
    {
      category: "Programming Languages",
      skills: [
        "JavaScript",
        "TypeScript",
        "C/C++",
        "SQL",
        "HTML",
        "CSS",
        "Python",
      ],
      icon: "💻",
      color: "from-blue-400 to-cyan-400",
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        "React.js",
        "Next.js",
        "AngularJS",
        "Vue.js",
        "Redux Toolkit",
        "Node.js",
        "Express.js",
      ],
      icon: "⚛️",
      color: "from-purple-400 to-pink-400",
    },
    {
      category: "UI & Styling Libraries",
      skills: ["Tailwind CSS", "Bootstrap", "Material UI", "Ant Design"],
      icon: "🎨",
      color: "from-pink-400 to-orange-400",
    },
    {
      category: "Cloud & DevOps",
      skills: [
        "AWS (ECS, ECR, EC2, Lambda, S3, DynamoDB, RDS)",
        "Docker",
        "Terraform",
        "GitHub Actions",
      ],
      icon: "☁️",
      color: "from-teal-400 to-blue-400",
    },
    {
      category: "Tools & Platforms",
      skills: [
        "Git & GitHub",
        "Webpack",
        "Linux",
        "Chrome Extensions",
        "CI/CD",
      ],
      icon: "🛠️",
      color: "from-green-400 to-emerald-400",
    },
  ];

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 relative overflow-hidden"
    >
      {/* Reduced animated background */}
      <div className="absolute inset-0 opacity-22">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 15% 85%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
                             radial-gradient(circle at 85% 15%, rgba(251, 146, 60, 0.2) 0%, transparent 50%),
                             radial-gradient(circle at 35% 35%, rgba(20, 184, 166, 0.2) 0%, transparent 50%),
                             radial-gradient(circle at 65% 65%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* 3D floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${8 + i * 11}%`,
              top: `${12 + i * 10}%`,
            }}
            animate={{
              y: [0, -25, 0],
              rotateX: [0, 180, 360],
              rotateY: [0, 180, 360],
              scale: [1, 1.25, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {/* 3D Octahedron-like element */}
            <div className="w-7 h-7 relative transform-style-preserve-3d">
              <div
                className="absolute inset-0 bg-gradient-to-br from-purple-200/50 to-pink-200/50 rounded-sm"
                style={{ transform: "translateZ(3.5px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-purple-200/50 to-pink-200/50 rounded-sm"
                style={{ transform: "translateZ(-3.5px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-purple-200/50 to-pink-200/50 rounded-sm"
                style={{ transform: "rotateY(90deg) translateZ(3.5px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-purple-200/50 to-pink-200/50 rounded-sm"
                style={{ transform: "rotateY(-90deg) translateZ(3.5px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-purple-200/50 to-pink-200/50 rounded-sm"
                style={{ transform: "rotateX(90deg) translateZ(3.5px)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-purple-200/50 to-pink-200/50 rounded-sm"
                style={{ transform: "rotateX(-90deg) translateZ(3.5px)" }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced floating skill icons with tech theme */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { icon: "🚀", size: "text-4xl", delay: 0 },
          { icon: "⚡", size: "text-3xl", delay: 1 },
          { icon: "🔥", size: "text-4xl", delay: 2 },
          { icon: "💎", size: "text-3xl", delay: 3 },
          { icon: "🌟", size: "text-4xl", delay: 4 },
          { icon: "🎯", size: "text-3xl", delay: 5 },
          { icon: "⚙️", size: "text-4xl", delay: 6 },
          { icon: "🔮", size: "text-3xl", delay: 7 },
        ].map((item, index) => (
          <motion.div
            key={item.icon}
            className={`absolute ${item.size} opacity-25`}
            style={{
              left: `${15 + index * 10}%`,
              top: `${20 + index * 8}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              delay: item.delay * 0.5,
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.category}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onHoverStart={() => setHoveredCategory(category.category)}
              onHoverEnd={() => setHoveredCategory(null)}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 opacity-5"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  background: `linear-gradient(45deg, ${category.color})`,
                  backgroundSize: "200% 200%",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <motion.span
                    className={`text-3xl mr-3 p-2 rounded-full bg-gradient-to-r ${category.color} text-white`}
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    {category.icon}
                  </motion.span>
                  <h3 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                    {category.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className={`px-3 py-2 text-sm rounded-full font-medium border cursor-pointer transition-all duration-300 ${
                        selectedSkill === skill
                          ? "bg-gradient-to-r from-pink-400 to-orange-400 text-white border-pink-400 scale-110"
                          : "bg-gradient-to-r from-pink-100 to-orange-100 text-gray-700 border-pink-200 hover:border-pink-400"
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.1, rotate: 2, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setSelectedSkill(selectedSkill === skill ? null : skill)
                      }
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Certificates section with better animations */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3
            className="text-4xl font-bold text-gray-800 mb-12 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Certificates & Achievements
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Python for Everybody",
                issuer: "Coursera",
                icon: "🐍",
                color: "from-green-400 to-emerald-400",
                description: "Comprehensive Python programming course",
              },
              {
                name: "React Basics",
                issuer: "Meta",
                icon: "⚛️",
                color: "from-blue-400 to-cyan-400",
                description: "Modern React development fundamentals",
              },
              {
                name: "MySQL Basics",
                issuer: "MySQL",
                icon: "🗄️",
                color: "from-orange-400 to-red-400",
                description: "Database management essentials",
              },
              {
                name: "GitHub Copilot",
                issuer: "Microsoft",
                icon: "🤖",
                color: "from-purple-400 to-pink-400",
                description: "AI-powered coding assistant",
              },
            ].map((cert, index) => (
              <motion.div
                key={cert.name}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
                whileHover={{ y: -8, scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  style={{
                    background: `linear-gradient(45deg, ${cert.color})`,
                    backgroundSize: "200% 200%",
                  }}
                />

                <div className="relative z-10">
                  <motion.div
                    className={`text-4xl mb-4 p-3 rounded-full bg-gradient-to-r ${cert.color} text-white inline-block`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {cert.icon}
                  </motion.div>

                  <motion.h4
                    className="font-semibold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    {cert.name}
                  </motion.h4>

                  <p className="text-gray-600 text-sm mb-2">{cert.issuer}</p>

                  <motion.p
                    className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    {cert.description}
                  </motion.p>
                </div>

                {/* Floating particles around certificate */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 opacity-60"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${30 + i * 20}%`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.6, 1, 0.6],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2 + i,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </div>

          {/* Achievement highlight */}
          <motion.div
            className="mt-12 inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 text-white font-bold text-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring" }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            🏆 Smart India Hackathon 2022 Winner - Department of Science &
            Technology
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Contact section with interactive form
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulate form submission
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white relative overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Let's Connect & Collaborate
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 mx-auto rounded-full" />
          <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
            I'm always excited to hear about new projects and opportunities.
            Whether you want to collaborate, hire me, or just say hello, I'd
            love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-16 items-center justify-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-pink-400">
                Get in Touch
              </h3>
              <p className="text-gray-300 leading-relaxed">
                I'm currently available for freelance work and full-time
                opportunities. Let's discuss how we can work together to create
                something amazing.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: "📧",
                  label: "Email",
                  value: "salonimaheshwari2113@gmail.com",
                  color: "from-pink-400 to-orange-400",
                },
                {
                  icon: "💼",
                  label: "LinkedIn",
                  value: "saloni-maheshwari",
                  color: "from-purple-400 to-pink-400",
                },
                {
                  icon: "🐙",
                  label: "GitHub",
                  value: "salonimaheshwarii",
                  color: "from-green-400 to-teal-400",
                },
              ].map((contact, index) => (
                <motion.div
                  key={contact.label}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${contact.color} flex items-center justify-center`}
                  >
                    {contact.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{contact.label}</p>
                    <p className="text-gray-300">{contact.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8">
              <h4 className="text-xl font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {[
                  {
                    name: "GitHub",
                    url: "https://github.com/salonimaheshwarii",
                    icon: "🐙",
                  },
                  {
                    name: "LinkedIn",
                    url: "https://linkedin.com/in/saloni-maheshwari-756830/",
                    icon: "💼",
                  },
                  {
                    name: "Email",
                    url: "mailto:salonimaheshwari2113@gmail.com",
                    icon: "📧",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Footer with animations
const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white py-12 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, #f472b6 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, #fb923c 0%, transparent 50%),
                             radial-gradient(circle at 40% 40%, #14b8a6 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4 md:mb-0"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Saloni Maheshwari
          </motion.div>

          <div className="flex items-center space-x-8 mb-4 md:mb-0">
            {["About", "Projects", "Experience", "Skills", "Contact"].map(
              (item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-pink-400 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              )
            )}
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 text-white font-semibold hover:from-pink-500 hover:to-orange-500 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Back to Top
          </motion.button>
        </div>

        <motion.div
          className="border-t border-white/20 mt-8 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p>
            &copy; {currentYear} Saloni Maheshwari. Built with ❤️ and lots of ☕
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

// Main Portfolio component with enhanced features
const Portfolio = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      }
    };

    // Easter egg: confetti on key press
    const handleKeyPress = (e) => {
      if (e.key === "s" || e.key === "S") {
        createConfetti();
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  const createConfetti = () => {
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: -10,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 3 + 2,
      color: ["#f472b6", "#fb923c", "#fbbf24", "#14b8a6", "#3b82f6", "#8b5cf6"][
        Math.floor(Math.random() * 6)
      ],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
    }));

    setConfetti((prev) => [...prev, ...newConfetti]);

    // Remove confetti after animation
    setTimeout(() => {
      setConfetti((prev) =>
        prev.filter((c) => !newConfetti.find((nc) => nc.id === c.id))
      );
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <CustomCursor />
      <ProgressBar />
      <Scroll3DModels />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
      <Footer />

      {/* Scroll indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-pink-400 rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-pink-400 rounded-full mt-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter egg hint */}
      <motion.div
        className="fixed bottom-4 right-4 text-xs text-gray-400 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 5 }}
        onClick={createConfetti}
      >
        💡 Press 'S' for confetti!
      </motion.div>

      {/* Confetti particles */}
      {confetti.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-50 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          animate={{
            x: particle.x + particle.vx * 30,
            y: particle.y + particle.vy * 30,
            rotate: particle.rotation + particle.rotationSpeed * 30,
            opacity: [1, 1, 0],
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: 3,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default Portfolio;
