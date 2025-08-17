"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import NSCCEvectorImg from "../assets/NSCC EVECTOR.png";
import nscchero from "../assets/hero.png";

const ShaderBackground = () => {
  const mountRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.innerWidth > 768, // Disable antialias on mobile for performance
      preserveDrawingBuffer: false, // Better performance
      premultipliedAlpha: false,
    });

    // Set proper size and pixel ratio for all devices
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ensure the canvas covers the full container
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100vw";
    renderer.domElement.style.height = "100vh";
    renderer.domElement.style.objectFit = "cover";
    renderer.domElement.style.zIndex = "0";

    mountRef.current.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      uniforms: {
        u_color: { value: [0.3137254901960784, 0, 1] },
        u_background: { value: [0.067, 0.133, 0.251, 1] }, // Match #112240 - the middle gradient color for better blending
        u_speed: { value: 0.876 },
        u_detail: { value: 0.074 },
        u_time: { value: 0 },
        u_mouse: { value: [0, 0] },
        u_resolution: { value: [window.innerWidth, window.innerHeight] },
      },
      transparent: true,
    });

    // Use a larger geometry for better mobile coverage
    const geometry = new THREE.PlaneGeometry(4096, 4096);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    camera.position.z = 5;

    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.u_time.value = elapsedTime;
      material.uniforms.u_mouse.value = [mouse.x / 2 + 0.5, mouse.y / 2 + 0.5];
      material.uniforms.u_resolution.value = [
        window.innerWidth,
        window.innerHeight,
      ];
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Ensure canvas covers full viewport on resize
      renderer.domElement.style.width = "100vw";
      renderer.domElement.style.height = "100vh";
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "0";
      renderer.domElement.style.left = "0";

      material.uniforms.u_resolution.value = [width, height];
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (mountRef.current && renderer.domElement)
        mountRef.current.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      id="hero"
      ref={mountRef}
      className="absolute inset-0 z-0 opacity-80"
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
};

const fragmentShader = `
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;
uniform vec4 u_background;
uniform float u_speed;
uniform float u_detail;

mat2 m(float a) {
  float c=cos(a), s=sin(a);
  return mat2(c,-s,s,c);
}

float map(vec3 p) {
  float t = u_time * u_speed;
  p.xz *= m(t * 0.4);
  p.xy*= m(t * 0.1);
  vec3 q = p * 2.0 + t;
  return length(p+vec3(sin((t*u_speed) * 0.1))) * log(length(p) + 0.9) + cos(q.x + sin(q.z + cos(q.y))) * 0.5 - 1.0;
}

void main() {
  // Normalize coordinates to center and maintain aspect ratio
  vec2 uv = (gl_FragCoord.xy - u_resolution.xy * 0.5) / min(u_resolution.x, u_resolution.y);
  
  // Create symmetrical pattern by mirroring coordinates
  vec2 a1 = uv;
  vec2 a2 = -uv; // Mirrored coordinates for opposite corner
  
  vec3 cl = vec3(0.0);
  float d = 2.5;
  
  // First pattern (original)
  for (float i = 0.; i <= (1. + 20. * u_detail); i++) {
    vec3 p = vec3(0, 0, 4.0) + normalize(vec3(a1, -1.0)) * d;
    float rz = map(p);
    float f = clamp((rz - map(p + 0.1)) * 0.5, -0.1, 1.0);
    vec3 l = vec3(0.1, 0.3, 0.4) + vec3(5.0, 2.5, 3.0) * f;
    cl = cl * l + smoothstep(2.5, 0.0, rz) * 0.6 * l;
    d += min(rz, 1.0);
  }
  
  // Second pattern (mirrored) - blend with the first
  d = 2.5; // Reset distance
  for (float i = 0.; i <= (1. + 20. * u_detail); i++) {
    vec3 p = vec3(0, 0, 4.0) + normalize(vec3(a2, -1.0)) * d;
    float rz = map(p);
    float f = clamp((rz - map(p + 0.1)) * 0.5, -0.1, 1.0);
    vec3 l = vec3(0.1, 0.3, 0.4) + vec3(5.0, 2.5, 3.0) * f;
    cl = cl * l + smoothstep(2.5, 0.0, rz) * 0.3 * l; // Slightly less intensity for blend
    d += min(rz, 1.0);
  }
  
  vec4 color = vec4(min(u_color, cl),1.0);
  color.r = max(u_background.r,color.r);
  color.g = max(u_background.g,color.g);
  color.b = max(u_background.b,color.b);
  gl_FragColor = color;
}`;

// Vertex shader
const vertexShader = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Navigation items with their corresponding section IDs
  const navItems = [
    { name: "Domains", href: "#domains" },
    { name: "Live Events", href: "#events" },
    { name: "Our Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  // Smooth scroll function
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".mobile-menu-container")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen bg-gradient-to-b from-[#0a192f] via-[#112240] to-[#061529] overflow-hidden"
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        marginBottom: "-1px", // Eliminate any potential gap between sections
      }}
    >
      <ShaderBackground />

      {/* Gradient Overlay to blend shader with background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/20 via-[#112240]/10 to-[#061529]/30 z-[1]" />

      {/* Enhanced Grid Lines - Limited to hero section only */}
      <div className="absolute inset-0 z-[2] hidden lg:block">
        {/* Vertical Lines */}
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"></div>
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent"></div>
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"></div>
        {/* Horizontal Lines */}
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>

        {/* Grid intersection highlights */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400/20 rounded-full blur-sm transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400/15 rounded-full blur-[1px] transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-3/4 left-3/4 w-1 h-1 bg-cyan-400/15 rounded-full blur-[1px] transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 bg-transparent text-white p-4 flex items-center justify-between max-w-full">
        <div className="text-2xl font-bold px-2 md:px-6 flex-shrink-0">
          <img
            src={NSCCEvectorImg}
            alt="NSCC Evector"
            className="h-8 md:h-10 w-auto drop-shadow-lg"
          />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex w-full justify-between px-4 xl:px-20 max-w-5xl">
          {navItems.map((item) => (
            <li
              key={item.name}
              className={`px-2 xl:px-4 py-4 ${
                item.name === "Contact" ? "bg-blue-800 rounded" : ""
              }`}
            >
              <button
                onClick={() => scrollToSection(item.href)}
                className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full font-helvetica-neue text-sm xl:text-base cursor-pointer"
              >
                {item.name}
              </button>
            </li>
          ))}
          
          {/* Recruitments Button */}
          <li className="px-2 xl:px-4 py-2">
            <a
              href="https://recruitments.nsccsrm.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#31C4BF] hover:bg-cyan-500 text-black font-semibold px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 border border-cyan-400/20 hover:border-cyan-400/40 font-helvetica-neue text-sm xl:text-base animate-pulse"
            >
              🚀 Recruitments Open
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-container lg:hidden">
          <button
            className="relative w-10 h-10 flex items-center justify-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-center items-center">
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-0.5" : "mb-1"
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "opacity-0 scale-0" : ""
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-0.5" : "mt-1"
                }`}
              ></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Modern Mobile Menu Overlay */}
      <div
        className={`mobile-menu-container lg:hidden fixed inset-0 z-50 transition-all duration-500 ease-out ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#0a192f] transition-opacity duration-500 ${
            isMenuOpen ? "opacity-80" : "opacity-0"
          }`}
        ></div>

        {/* Menu Content */}
        <div
          className={`relative h-full flex flex-col transition-all duration-500 transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            className={`flex justify-between items-center p-6 border-b border-white/10 transition-all duration-500 ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-8 pointer-events-none"
            }`}
          >
            <div className="text-xl font-bold text-white">Menu</div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all duration-300"
              aria-label="Close menu"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center px-6">
            <ul className="space-y-6">
              {navItems.map((item, index) => (
                <li
                  key={item.name}
                  className={`transform transition-all duration-500 delay-${
                    index * 100
                  } ${
                    isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-8 opacity-0"
                  }`}
                >
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`block text-2xl font-medium transition-all duration-300 hover:translate-x-2 w-full text-left ${
                      item.name === "Contact"
                        ? "text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg shadow-lg"
                        : "text-white/90 hover:text-white border-b border-transparent hover:border-white/30 pb-2"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              
              {/* Mobile Recruitments Button */}
              <li
                className={`transform transition-all duration-500 delay-${
                  navItems.length * 100
                } ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
              >
                <a
                  href="https://recruitments.nsccsrm.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-black bg-[#31C4BF] hover:bg-cyan-500 px-6 py-3 rounded-lg shadow-lg text-2xl font-medium transition-all duration-300 hover:translate-x-2 text-center border border-cyan-400/20 hover:border-cyan-400/40 animate-pulse"
                >
                  🚀 Recruitments Open
                </a>
              </li>
            </ul>
          </div>
          <div className="flex-1"></div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10">
            <p className="text-white/60 text-sm text-center">
              © 2024 NSCC. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Hero Section with Grid-Aligned Logo */}
      <section className="relative z-10 text-white min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center text-center px-4 md:p-6">
        {/* Grid-Aligned Main Logo Container */}
        <div className="w-full h-full flex items-center justify-center relative">
          {/* Desktop: Grid-aligned logo - centered between grid lines */}
          <div className="hidden lg:block w-full max-w-7xl mx-auto relative">
            {/* Logo positioned to be centered between grid intersections */}
            <div className="flex items-center justify-center relative">
              <img
                src={nscchero}
                alt="NSCC Logo"
                className="w-auto h-[40vh] max-h-[450px] object-contain relative z-10 hover:brightness-110 hover:contrast-105 transition-all duration-700 ease-out hover:scale-105"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(6, 182, 212, 0.3))",
                  transform: "translateY(-8vh)",
                }}
              />

              {/* Subtle glow effect behind logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-transparent blur-2xl opacity-60" />
            </div>

            {/* Desktop Description - Back to original left position */}
            <div className="absolute left-[25.6%] w-[24%] top-[75%] text-left">
              <motion.div
                className="backdrop-blur-xl bg-gradient-to-br from-white/8 to-white/3 rounded-2xl p-6 border border-cyan-400/20 hover:scale-105 hover:shadow-2xl transition-all duration-500 hover:border-cyan-400/40"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              >
                <div className="relative z-10">
                  {[
                    "Dive deep into real-world tech",
                    "Learn beyond the curriculum",
                    "Code with purpose, build with impact",
                    "Join the developers of tomorrow",
                  ].map((line, index) => (
                    <motion.p
                      key={index}
                      className="text-base text-gray-200 leading-relaxed font-helvetica-neue hover:text-cyan-400 transition-colors duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                    >
                      {line} <br />
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Tablet: Centered with adjusted sizing */}
          <div className="hidden md:block lg:hidden w-full max-w-4xl mx-auto relative">
            <div className="flex items-center justify-center relative">
              <img
                src={nscchero}
                alt="NSCC Logo"
                className="w-full max-w-[500px] h-auto object-contain relative z-10 hover:brightness-110 hover:contrast-105 transition-all duration-700 ease-out hover:scale-105"
                style={{
                  filter: "drop-shadow(0 0 25px rgba(6, 182, 212, 0.3))",
                  transform: "translateY(-6vh)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-transparent blur-2xl opacity-50" />
            </div>
          </div>

          {/* Mobile: Compact centered layout */}
          <div className="block md:hidden w-full max-w-sm mx-auto relative">
            <div className="flex items-center justify-center relative">
              <img
                src={nscchero}
                alt="NSCC Logo"
                className="w-full h-auto max-w-[280px] object-contain relative z-10 hover:brightness-110 transition-all duration-500"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(6, 182, 212, 0.3))",
                  transform: "translateY(-4vh)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/8 via-blue-500/4 to-transparent blur-xl opacity-40" />
            </div>
          </div>
        </div>

        {/* Enhanced Mobile/Tablet Description */}
        <motion.div
          className="lg:hidden w-full max-w-md mx-auto mt-8 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <motion.div
            className="backdrop-blur-xl bg-gradient-to-br from-white/8 to-white/3 rounded-2xl p-6 border border-cyan-400/20 relative overflow-hidden"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(6, 182, 212, 0.2)",
              borderColor: "rgba(6, 182, 212, 0.4)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div className="relative z-10">
              {[
                "Dive deep into real-world tech",
                "Learn beyond the curriculum",
                "Code with purpose, build with impact",
                "Join the developers of tomorrow",
              ].map((line, index) => (
                <motion.p
                  key={index}
                  className="text-sm md:text-base text-gray-200 leading-relaxed font-helvetica-neue text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 + index * 0.2 }}
                  whileHover={{
                    color: "#06b6d4",
                    textShadow: "0 0 8px rgba(6, 182, 212, 0.5)",
                  }}
                >
                  {line} <br />
                </motion.p>
              ))}
            </motion.div>
            {/* Subtle animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-500/5 opacity-50" />
          </motion.div>
        </motion.div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-20"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-2 h-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-[1px]" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
