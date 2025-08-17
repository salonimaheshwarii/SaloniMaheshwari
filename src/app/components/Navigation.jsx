"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Navigation({
  sections,
  currentSection,
  onSectionChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 p-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="professional-card px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-4"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">SM</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-slate-100">SALONI MAHESHWARI</span>
                  <span className="text-xs text-slate-400 font-medium">Software Engineer</span>
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {sections.slice(0, 6).map((section, index) => (
                  <motion.button
                    key={section.id}
                    onClick={() => onSectionChange(index)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      currentSection === index
                        ? "bg-blue-500/20 text-blue-400 shadow-lg border border-blue-500/30"
                        : "text-slate-300 hover:text-blue-400 hover:bg-blue-500/10"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section.title.split(" ")[0]}
                  </motion.button>
                ))}

                {/* More Menu */}
                <div className="relative">
                  <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-4 py-2 rounded-lg font-medium text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    More
                  </motion.button>

                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 bg-gray-900/90 backdrop-blur-md border border-cyan-400/30 rounded-xl shadow-2xl shadow-cyan-400/20 overflow-hidden"
                    >
                      {sections.slice(6).map((section, index) => (
                        <button
                          key={section.id}
                          onClick={() => {
                            onSectionChange(index + 6);
                            setIsOpen(false);
                          }}
                          className={`block w-full px-6 py-3 text-left font-medium transition-all duration-300 ${
                            currentSection === index + 6
                              ? "bg-cyan-400/20 text-cyan-400"
                              : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10"
                          }`}
                        >
                          {section.title}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div
                    className={`w-full h-0.5 bg-cyan-400 transition-transform ${
                      isOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                  ></div>
                  <div
                    className={`w-full h-0.5 bg-cyan-400 transition-opacity ${
                      isOpen ? "opacity-0" : ""
                    }`}
                  ></div>
                  <div
                    className={`w-full h-0.5 bg-cyan-400 transition-transform ${
                      isOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                  ></div>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          className="fixed top-0 right-0 w-80 h-full bg-gray-900/95 backdrop-blur-md border-l border-cyan-400/30 z-50 md:hidden"
        >
          <div className="p-6 pt-24">
            <div className="space-y-2">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  onClick={() => {
                    onSectionChange(index);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    currentSection === index
                      ? "bg-cyan-400/20 text-cyan-400 shadow-lg shadow-cyan-400/30"
                      : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10"
                  }`}
                  whileHover={{ x: 10 }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        currentSection === index ? "bg-cyan-400" : "bg-gray-500"
                      }`}
                    ></div>
                    <span>{section.title}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
