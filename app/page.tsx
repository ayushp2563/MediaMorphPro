"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Share2, Upload, ImageIcon } from "lucide-react";
import logo from "./apple-touch-icon.png";

const LandingPage: React.FC = () => {
  const [showScrollButton, setShowScrollButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      setShowScrollButton(!isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    "User-friendly interface",
    "Fast processing times",
    "Cloud-based solution powered by Cloudinary",
    "Responsive design for seamless use across devices",
    "Secure handling of your media files",
  ];

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 p-4 md:p-6 z-50 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <span className="md:text-2xl font-bold ">MediaMorphPro</span>
          </Link>

          <div className="flex space-x-2 md:space-x-4">
            <Link href="/sign-in">
              <button className="btn btn-ghost btn-sm md:btn-md">
                Sign In
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="btn btn-primary btn-sm md:btn-md">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero min-h-screen flex md:items-center md:justify-center px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="sm:text-center max-w-4xl"
        >
          <h1 className="mb-5 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Welcome to MediaMorphPro
          </h1>

          <div className="p-6 rounded-lg max-w-lg mx-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg ">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Key Features</h2>
            <ul className="space-y-2 text-sm md:text-base ">
              {features.map((feature, index) => (
                <li key={index} className="flex ">
                  <span className="text-gray-300 mr-2 items-start justify-start text-start">
                    •
                  </span>
                  <span className="items-self justify-self text-wrap">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/signup">
            <button className="mt-8 btn btn-primary btn-lg">Get Started</button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Social Share"
              description="Convert your images as per Social Media app's need."
              icon={<Share2 size={32} />}
            />
            <FeatureCard
              title="Video Upload"
              description="Compress your video."
              icon={<Upload size={32} />}
            />
            <FeatureCard
              title="Image to URL"
              description="Get URL for your image."
              icon={<ImageIcon size={32} />}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="mb-8 text-lg md:text-xl">
            Join as initial customers and take your operations to the next
            level.
          </p>
          <Link href="/signup">
            <button className="btn btn-primary btn-lg">
              Start Your Free Trial
            </button>
          </Link>
        </div>
      </section>

      {/* Scroll Button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToBottom}
            className="fixed bottom-8 right-8 bg-white text-purple-900 rounded-full p-3 shadow-lg hover:bg-purple-100 transition-colors duration-300"
            aria-label="Scroll to bottom"
          >
            <ChevronDown size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ title, description, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl md:text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300 text-sm md:text-base">{description}</p>
  </motion.div>
);

export default LandingPage;
