"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiAmazon,
  SiAdobe,
  SiApache,
  SiAppstore,
  SiAudible,
  SiTiktok,
} from "react-icons/si";
const CODE_ICONS = [
  { icon: <SiTypescript className="text-blue-500" />, color: "text-blue-500" },
  {
    icon: <SiJavascript className="text-yellow-400" />,
    color: "text-yellow-400",
  },
  { icon: <SiPython className="text-blue-400" />, color: "text-blue-400" },
  { icon: <SiAmazon className="text-red-500" />, color: "text-red-500" },
  { icon: <SiTiktok className="text-white-500" />, color: "text-black-500" },
  { icon: <SiAudible className="text-orange-500" />, color: "text-orange-500" },
  { icon: <SiAppstore className="text-blue-500" />, color: "text-blue-500" },
  { icon: <SiApache className="text-purple-500" />, color: "text-purple-500" },
  { icon: <SiAdobe className="text-purple-500" />, color: "text-purple-500" },
  { icon: <FaCode className="text-purple-500" />, color: "text-purple-500" },
];
interface icon {
  duration: number;
  color: string;
  size: number;
  x: number;
  y: number;
  id: number;
  icon: React.ReactElement<string>;
}
export default function FloatingIcon() {
  const [activeIcons, setActiveIcons] = useState<icon[]>([]);

  useEffect(() => {
    const iconInterval = setInterval(() => {
      const iconCount = Math.floor(Math.random() * 3) + 2;
      const newIcons: icon[] = [];
      for (let i = 0; i < iconCount; i++) {
        const iconIndex = Math.floor(Math.random() * CODE_ICONS.length);
        newIcons.push({
          id: Date.now() + i,
          icon: CODE_ICONS[iconIndex].icon,
          color: CODE_ICONS[iconIndex].color,
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          size: Math.random() * 20 + 10,
          duration: Math.random() * 5 + 3,
        });
      }

      setActiveIcons((prev) => [...prev, ...newIcons]);

      setTimeout(() => {
        setActiveIcons((prev) =>
          prev.filter((icon) => !newIcons.some((ni) => ni.id === icon.id))
        );
      }, 3000);
    }, 1500);

    return () => clearInterval(iconInterval);
  }, []);
  return (
    <>
      {activeIcons.map((icon) => (
        <motion.div
          key={icon.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: -20,
            x: [icon.x, icon.x + (Math.random() * 20 - 10)],
          }}
          transition={{ duration: icon.duration, ease: "easeOut" }}
          className={`absolute ${icon.color}`}
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            fontSize: `${icon.size}px`,
          }}
        >
          {icon.icon}
        </motion.div>
      ))}
    </>
  );
}
