"use client";

import { subpageTransitionMotion } from "@/utils/framerUtil";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return <motion.div {...subpageTransitionMotion}>{children}</motion.div>;
}
