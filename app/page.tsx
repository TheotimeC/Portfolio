import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Navigator } from "@/components/sections/navigator";
import { WhatIBuild } from "@/components/sections/what-i-build";
import { Projects } from "@/components/sections/projects";
import { Approach } from "@/components/sections/approach";
import { Writing } from "@/components/sections/writing";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* Separator */}
        <div className="mx-auto max-w-6xl px-6">
          <hr className="border-[var(--color-border)]" />
        </div>

        <Navigator />

        <div className="mx-auto max-w-6xl px-6">
          <hr className="border-[var(--color-border)]" />
        </div>

        <WhatIBuild />

        <div className="mx-auto max-w-6xl px-6">
          <hr className="border-[var(--color-border)]" />
        </div>

        <Projects />

        <div className="mx-auto max-w-6xl px-6">
          <hr className="border-[var(--color-border)]" />
        </div>

        <Approach />

        <div className="mx-auto max-w-6xl px-6">
          <hr className="border-[var(--color-border)]" />
        </div>

        <Writing />

        <Contact />
      </main>
    </>
  );
}
