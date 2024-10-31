"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Snail } from "lucide-react";
import { ArrowRightIcon, DiscordLogoIcon  } from "@radix-ui/react-icons";
import { CiShop } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Highlight } from "@/components/ui/hero-highlight";
import { Separator } from "@/components/ui/separator";
import AnimatedShinyButton from "@/components/ui/animated-shiny-button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
        <div className="container h-14 flex items-center">
          <Link
            href="/"
            className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
          >
            <Snail className="w-6 h-6 mr-1" />
            <span className="font-bold">DevLab</span>
            <span className="sr-only">DevLab</span>
          </Link>
          <div className="flex h-5 items-center space-x-4 text-sm pl-10">
              <Link href="#Features">
                <div>Features</div>
              </Link>
              <Separator orientation="vertical" />
              <Link href="#About">
              <div>About</div>
              </Link>
            </div>
          <nav className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-8 h-8 bg-background"
              asChild
            >
              <Link href="https://discord.gg/PqRxDwDCnp">
                <DiscordLogoIcon className="h-[1.2rem] w-[1.2rem]" />
              </Link>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </header>
      <main className="min-h-[calc(100vh-57px-97px)] flex-1">
        <div className="container relative pb-10">
          <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
            <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              Introducing ‎
            <span className="dark:text-zinc-950 text-white">
              <Highlight>DevLab</Highlight>  
            </span>
            </h1>
            <span className="max-w-[750px] text-center text-lg font-light text-foreground">
              A tool for FiveM developers!
            </span>
            <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
            <Link href="https://discord.gg/PqRxDwDCnp" target="_blank" rel="noopener noreferrer">
              <AnimatedShinyButton 
                className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-discord-color-300 hover:duration-300 hover:dark:text-discord-color-200 bg-discord-color-500 dark:bg-discord-color-500"
              >
                <span>Join Discord Community</span>
                <DiscordLogoIcon className="ml-1 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyButton>
            </Link><Link href="https://devlab.sellhub.cx/" target="_blank" rel="noopener noreferrer">
              <AnimatedShinyButton 
                className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-discord-color-300 hover:duration-300 hover:dark:text-discord-color-200 bg-orange-400 dark:bg-orange-400"
              >
                <span>DevLab Store</span>
                <CiShop className="ml-1 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyButton>
            </Link>
              <Link href="/dashboard">
                <AnimatedShinyButton className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <span>Access to Dashboard</span>
                  <ArrowRightIcon className="ml-1 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedShinyButton>
              </Link>
            </div>
          </section>
          <div className="w-full flex justify-center relative">
            <Image
              src="/demo-light-min.png"
              width={1080}
              height={608}
              alt="demo"
              priority
              className="border rounded-xl shadow-sm dark:hidden"
            />
            <Image
              src="/demo-dark-min.png"
              width={1080}
              height={608}
              alt="demo-dark"
              priority
              className="border border-zinc-600 rounded-xl shadow-sm hidden dark:block dark:shadow-zinc-500/5"
            />
            <Image
              src="/demo-mobile-light-min.png"
              width={228}
              height={494}
              alt="demo-mobile"
              className="border rounded-xl absolute bottom-0 right-0 hidden lg:block dark:hidden"
            />
            <Image
              src="/demo-mobile-dark-min.png"
              width={228}
              height={494}
              alt="demo-mobile"
              className="border border-zinc-600 rounded-xl absolute bottom-0 right-0 hidden dark:lg:block"
            />
          </div>
        </div>
        
        {/* Features Section */}
        <section id="Features" className="bg-white dark:bg-zinc-950 py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Real-time Search</h3>
                <p className="text-zinc-700 dark:text-zinc-300">
                  Quickly find the references you need with our powerful real-time search functionality.
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Centralized Database</h3>
                <p className="text-zinc-700 dark:text-zinc-300">
                  Access all your game references from a single, organized database, saving you time and effort.
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">User-Friendly Interface</h3>
                <p className="text-zinc-700 dark:text-zinc-300">
                  Enjoy a seamless experience with our intuitive and easy-to-use interface designed for developers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section  id="About" className="bg-white dark:bg-zinc-950 py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">About</h2>
            <p className="max-w-2xl mx-auto mb-8 text-zinc-700 dark:text-zinc-300">
              As a FiveM developer, I often faced challenges finding in-game references from multiple websites, 
              which wasted time and reduced productivity. This experience inspired me to create a centralized tool 
              where all essential game references are available in one place, making it easier and more efficient 
              for developers like myself to access the information they need without hassle. This project aims to 
              streamline the workflow, save time, and boost productivity for the FiveM development community. 
              This project is part of my portfolio for Holberton School. 
            </p>

            <div>
              This project was made for help FiveM developers
            </div>
          </div>
        </section>
        
      </main>
    </div>
  );
}
