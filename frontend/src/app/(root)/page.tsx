"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPython,
  FaJava,
  FaCode,
  FaSun,
  FaMoon,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import {
  SiJavascript,
} from "react-icons/si";
// import { SiCplusplus } from "react-icons/si";
import Editor from "react-simple-code-editor";
import "prismjs"; // Core first
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript"; // Added
import { highlight, languages } from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { useMemo } from "react";
interface Code  {
  python: string;
  java: string;
  javascript: string;
  [key: string]: string; // Add index signature for string keys
}
const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeLanguage, setActiveLanguage] = useState("python");
  const [code, setCode] = useState("");
  // const [isScrolled, setIsScrolled] = useState(false);

  const codeSnippets: Code = useMemo(
    () => ({
      python:
        "def reverseList(head):\n    prev = None\n    while head:\n        next_node = head.next\n        head.next = prev\n        prev = head\n        head = next_node\n    return prev",
      java:
        "public ListNode reverseList(ListNode head) {\n    ListNode prev = null;\n    while (head != null) {\n        ListNode next = head.next;\n        head.next = prev;\n        prev = head;\n        head = next;\n    }\n    return prev;\n}",
      javascript:
        "function reverseList(head) {\n    let prev = null;\n    while (head !== null) {\n        let next = head.next;\n        head.next = prev;\n        prev = head;\n        head = next;\n    }\n    return prev;\n}",
    }),
    []
  );

  // Update code when language changes
  useEffect(() => {
    setCode(codeSnippets[activeLanguage]);
  }, [activeLanguage, codeSnippets]);

  // Scroll listener for navbar
  // useEffect(() => {
  //   const handleScroll = () => setIsScrolled(window.scrollY > 10);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const features = [
    {
      icon: <FaCode className="text-3xl" />,
      title: "Multi-Language",
      description: "Python, Java, Javascript with syntax highlighting",
    },
    {
      icon: <div className="text-3xl">📊</div>,
      title: "30+ Problems",
      description: "Curated by Chai Code Student",
    },
    {
      icon: <div className="text-3xl">⚡</div>,
      title: "Real-Time",
      description: "Instant execution & debugging",
    },
  ];

  return (
    <div
      className={`min-h-screen w-full transition-colors ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <nav
        className={`w-full transition-all py-4`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <span
              className={`text-2xl font-bold bg-gradient-to-r from-teal-400 via-[#0CAFFF] to-blue-500 bg-clip-text text-transparent hover:from-pink-500 hover:to-yellow-500`}
            >
              DSArena
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {darkMode ? (
                <FaSun className="text-yellow-300" />
              ) : (
                <FaMoon className="text-gray-700" />
              )}
            </button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 w-full">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Solve. Practice. Ace. Your Multilingual{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-[#0CAFFF] to-blue-500 bg-clip-text text-transparent">
                DSA Playground
              </span>{" "}
              Code Smarter , Not Harder!
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-10">
              The ultimate platform to practice Data Structures & Algorithms in{" "}
              <br className="hidden md:block" />
              <span className="font-semibold">Python, Java, and C++</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-teal-500 to-blue-600 px-8 py-4 rounded-xl font-semibold shadow-lg"
              >
                Start Coding Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-4 rounded-xl font-semibold border ${
                  darkMode
                    ? "border-gray-600 hover:bg-gray-800"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                Explore Problems
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center space-x-4 mb-20"
          >
            {[
              { name: "Python", icon: <FaPython /> ,  value: "python"  },
              { name: "Java", icon: <FaJava /> , value: "java"},
              { name: "Javascript", icon: <SiJavascript />, value: "javascript" },
            ].map((lang) => (
              <button
                key={lang.name}
                onClick={() => setActiveLanguage(lang.value.toLowerCase())}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
                  activeLanguage === lang.name.toLowerCase()
                    ? "bg-teal-500 text-white shadow-md"
                    : darkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <span className="text-xl">{lang.icon}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div
              className={`flex items-center justify-between p-4 ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-sm font-mono">
                {activeLanguage.toUpperCase()}
              </div>
            </div>
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => {
                try {
                  return highlight(
                    code,
                    languages[activeLanguage.toLowerCase()],
                    activeLanguage.toLowerCase()
                  );
                } catch (e) {
                  console.error("Syntax highlighting error:", e);
                  return code; // Fallback to unhighlighted code
                }
              }}
              padding={20}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                minHeight: "300px",
                backgroundColor: darkMode ? "#1e293b" : "#f8fafc",
              }}
              //className="scrollbar-hide"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Developers Love DSArena
            </h2>
            <p className="max-w-2xl mx-auto opacity-80">
              Built with cutting-edge tools to accelerate your DSA mastery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-xl ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-50"
                } shadow-lg transition-all hover:-translate-y-2`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className={`py-20 px-6 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Trusted By Developers Worldwide
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "DSArena helped me land my Google offer! The C++ problems are exceptional.",
                author: "Sarah K.",
                role: "Software Engineer @ Google",
              },
              {
                quote:
                  "I improved my problem-solving speed by 3x using their Java exercises.",
                author: "Raj P.",
                role: "Senior Developer @ Amazon",
              },
              {
                quote:
                  "Best platform for Python DSA practice. The UI is incredibly intuitive.",
                author: "Miguel T.",
                role: "Data Engineer @ Meta",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-xl ${
                  darkMode ? "bg-gray-700" : "bg-white"
                } shadow-lg`}
              >
                <div className="text-4xl mb-4 opacity-20"></div>
                <p className="text-lg mb-6">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`max-w-3xl mx-auto p-8 rounded-xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-xl`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Ace Your Next Coding Interview?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 50,000+ developers leveling up their DSA skills
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-teal-500 to-blue-600 px-8 py-4 rounded-lg font-semibold shadow-lg"
            >
              Get Started - It&apos;s Free
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 px-6 ${darkMode ? "bg-gray-900" : "bg-gray-200"}`}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Code Duster
              </span>
              <p
                className={`mt-2 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                The ultimate DSA practice platform
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className={`hover:text-teal-400 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <FaGithub className="text-2xl" />
              </a>
              <a
                href="#"
                className={`hover:text-teal-400 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>
          <div
            className={`border-t mt-8 pt-8 ${
              darkMode ? "border-gray-700" : "border-gray-300"
            } text-center`}
          >
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              © 2025 Code Duster. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
