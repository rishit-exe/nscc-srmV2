"use client";

import { useEffect, useRef, useState } from "react";
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
      antialias: true,
      preserveDrawingBuffer: true,
      premultipliedAlpha: false,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.objectFit = "cover";
    mountRef.current.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      uniforms: {
        u_color: { value: [0.3137254901960784, 0, 1] },
        u_background: { value: [0.039, 0.098, 0.184, 1] },
        u_speed: { value: 0.876 },
        u_detail: { value: 0.074 },
        u_time: { value: 0 },
        u_mouse: { value: [0, 0] },
        u_resolution: { value: [window.innerWidth, window.innerHeight] },
      },
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(2048, 2048);
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
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
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
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
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
  vec2 a = gl_FragCoord.xy / u_resolution.x - vec2(0.5, 0.5);
  vec3 cl = vec3(0.0);
  float d = 2.5;
  for (float i = 0.; i <= (1. + 20. * u_detail); i++) {
    vec3 p = vec3(0, 0, 4.0) + normalize(vec3(a, -1.0)) * d;
    float rz = map(p);
    float f = clamp((rz - map(p + 0.1)) * 0.5, -0.1, 1.0);
    vec3 l = vec3(0.1, 0.3, 0.4) + vec3(5.0, 2.5, 3.0) * f;
    cl = cl * l + smoothstep(2.5, 0.0, rz) * 0.6 * l;
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
      className="relative min-h-screen bg-[#0a192f] overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <ShaderBackground />

      {/* Grid Lines - Limited to hero section only */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        {/* Vertical Lines */}
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        {/* Horizontal Lines */}
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-transparent text-white p-4 flex items-center justify-between max-w-full">
        <div className="text-2xl font-bold px-2 md:px-6 flex-shrink-0">
          <img
            src={NSCCEvectorImg}
            alt="NSCC Evector"
            className="h-8 md:h-10 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex w-full justify-between px-4 xl:px-20 max-w-4xl">
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
          className={`absolute inset-0 bg-[#0a192f]/100  transition-opacity duration-500 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Menu Content */}
        <div
          className={`relative h-full flex flex-col transition-all duration-500 transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header with Close Button */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <div className="text-xl font-bold text-white">Menu</div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all duration-300"
              aria-label="Close menu"
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

          {/* Menu Items */}
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
            </ul>
          </div>

          {/* Spacer to push footer to bottom */}
          <div className="flex-1"></div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10">
            <p className="text-white/60 text-sm text-center">
              © 2024 NSCC. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 text-white min-h-[80vh] md:h-[90vh] flex flex-col items-center justify-center text-center px-4 md:p-6 overflow-hidden">
        {/* Main Heading */}
        <div className="w-full max-w-6xl mx-auto relative">
          <img
            src={nscchero}
            alt="NSCC Logo"
            className="w-full h-auto max-w-full object-contain opacity-100 -mt-8 md:-mt-16 md:relative md:-top-16 md:left-10"
          />
        </div>

        {/* Positioned Lorem Ipsum Section - Desktop */}
        <div className="absolute left-[25.6%] w-[24%] top-[75%] text-left hidden xl:block">
          <p className="text-base text-gray-300 leading-relaxed font-helvetica-neue">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        {/* Mobile/Tablet version of Lorem Ipsum */}
        <div className="xl:hidden w-full max-w-md mx-auto mt-4 px-4">
          <p className="text-sm md:text-base text-gray-300 leading-relaxed font-helvetica-neue text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </section>
    </div>
  );
}
