"use client";
import { useRef } from "react";
import { useInView } from "framer-motion";

/** True only while the element is on screen, so previews pause work when off-screen. */
export function useActive<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const active = useInView(ref, { margin: "0px 0px -10% 0px" });
  return { ref, active };
}
