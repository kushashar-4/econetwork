"use client";

import { useRef, useEffect } from "react";

import gsap from "gsap";

import NavbarComponent from "@/components/Navbar";
import BG from "@/components/Background";

export default function Home() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 640px)",
        isMobile: "(max-width: 639px)",
      },
      (ctx) => {
        const { isMobile: mobile } = ctx.conditions as Record<string, boolean>;

        gsap.to("main", {
          opacity: 1,
          duration: !mobile ? 1 : 0,
          ease: "power4.out",
          delay: !mobile ? 2 : 0,
        });
      },
      root
    );

    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="flex flex-col h-full min-h-screen">
      <NavbarComponent></NavbarComponent>
      <BG />
      <main className="absolute bottom-1 md:bottom-12 left-0 flex flex-col z-50 md:gap-3 gap-0 opacity-0 bg-white md:bg-transparent">
        <h1 className="font-semibold text-green-950 md:text-4xl text-3xl md:pl-12 md:p-6 p-2 bg-white rounded-r-sm w-max max-w-[100vw]">
          The environment <span className="text-green">needs</span> you.
        </h1>
        <p className="text-green-950 md:text-2xl md:pl-12 md:p-6 p-2 bg-white rounded-r-sm">
          Help save future generations- and get recognized for it- by joining
          EcoNetwork.
        </p>
        <a href="/signup">
          <button className="bg-green text-white md:text-2xl md:mt-0 mt-2 md:pl-12 md:p-6 p-2 md:m-0 ml-2 rounded-sm md:rounded-l-none transition-all ease hover:pl-24">
            Get Started
          </button>
        </a>
      </main>
    </div>
  );
}
