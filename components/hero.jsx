"use client";

import { Link } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef } from "react";

const Hero = () => {
    const imageref = useRef(null);
    useEffect(()=>{
        const imageElement = imageref.current;

        const handleScroll = () => {
          const scrollPosition = window.scrollY;
          const scrollThreshold = 100;
    
          if (scrollPosition > scrollThreshold) {
            imageElement.classList.add("scrolled");
          } else {
            imageElement.classList.remove("scrolled");
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
  const router = useRouter();
  return (
    <section className=" w-full pt-36 md:pt-48 pb-10">
      <div className=" space-y-6 text-center">
        <div className="space-y-6 mx-auto ">
          <h1 className="gradient-title text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl">
            Your AI Career Coach for <br />
            Professional Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-2xl">
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </p>
        </div>

        <div>
          <Button
            size="lg"
            className="px-8 bg-white"
            onClick={() => router.push("/dashboard")}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            className="px-8"
            variant="outline"
            onClick={() => router.push("/dashboard")}
          >
            Get Started
          </Button>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
            <div ref={imageref} className="hero-image">
                <Image src={"/logo.png"} width={1280} height={720} alt="Banner Sensai" className=" rounded-lg shadow-2xl border mx-auto" priority />
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
