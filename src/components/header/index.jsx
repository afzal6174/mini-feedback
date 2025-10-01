"use client";

import { ThemeToggle } from "@/components/theme/toggle-button";
import { useRef } from "react";
import Logo from "./logo";

export function Header(props) {
  const headerRef = props?.ref ?? useRef(null);
  const lastScroll = useRef(0);

  if (typeof window !== "undefined") {
    window.onscroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll.current && headerRef.current) {
        headerRef.current.style.transform = "translateY(-100%)";
        headerRef.current.style.opacity = "0";
      } else if (headerRef.current) {
        headerRef.current.style.transform = "translateY(0)";
        headerRef.current.style.opacity = "1";
      }

      lastScroll.current = currentScroll;
    };
  }

  return (
    <header
      ref={headerRef}
      className="max-container flex items-center justify-between gap-4 border-b backdrop-blur-sm transition-all duration-500 ease-in-out"
      {...props}
    >
      <Logo />
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
