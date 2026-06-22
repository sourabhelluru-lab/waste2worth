import { createFileRoute } from "@tanstack/react-router";

import ewasteHero from "@/assets/recycling/ewaste-hero.jpg";
import ewasteCollection from "@/assets/recycling/ewaste-collection.jpg";
import ewasteSorting from "@/assets/recycling/ewaste-sorting.jpg";
import ewasteDismantling from "@/assets/recycling/ewaste-dismantling.jpg";
import ewasteRecovery from "@/assets/recycling/ewaste-recovery.jpg";
import ewasteProducts from "@/assets/recycling/ewaste-products.jpg";

export const Route = createFileRoute("/education/ewaste")({
  component: EWastePage,
});

function EWastePage() {
  return (
    <div className="bg-[#031416] text-white">
      {/* ewaste HERO */}
      <section className="relative h-screen overflow-hidden">
        <img
          src={ewasteHero}
          alt="ewaste Pollution"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-5xl text-center text-white">
            <div className="mb-8 text-8xl"></div>

            <h1 className="text-6xl font-black md:text-8xl">
              ewaste Recycling
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-xl text-white/80 md:text-2xl">
              Recovering valuable materials from discarded electronics while reducing environmental hazards and electronic waste pollution.
            </p>

            <div className="mt-10 flex justify-center gap-4">
              <a
                href="#journey"
                className="rounded-full bg-emerald-500 px-8 py-4 font-bold text-white transition hover:scale-105"
              >
                Explore Journey
              </a>

              <a
                href="#impact"
                className="rounded-full border border-white/30 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur"
              >
                View Impact
              </a>
            </div>
          </div>
        </div>
      </section>

      {/*Why E-Waste Recycling Matters*/}
      <section id="journey" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-5xl font-black md:text-6xl">
              The waste Crisis
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70">
              Millions of electronic devices are discarded every year. Proper recycling recovers valuable materials, prevents toxic pollution and reduces the growing burden of electronic waste.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-[2rem] border border-red-500/20 bg-red-500/5 p-8 backdrop-blur-xl hover:-translate-y-2 transition">
              <div className="text-6xl"></div>
              <h3 className="mt-6 text-5xl font-black"></h3>
              <p className="mt-3 text-white/70">
🔋
50M+
Tonnes of E-Waste Generated Annually
              </p>
            </div>

            <div className="rounded-[2rem] border border-orange-500/20 bg-orange-500/5 p-8 backdrop-blur-xl hover:-translate-y-2 transition">
              <div className="text-6xl"></div>
              <h3 className="mt-6 text-5xl font-black">⛏️</h3>
              <p className="mt-3 text-white/70">
💻
Valuable Metals Recovered
              </p>
            </div>

            <div className="rounded-[2rem] border border-yellow-500/20 bg-yellow-500/5 p-8 backdrop-blur-xl hover:-translate-y-2 transition">
              <div className="text-6xl"></div>
              <h3 className="mt-6 text-5xl font-black">♻️</h3>
              <p className="mt-3 text-white/70">
                ♻️
Safer Environment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE VS AFTER */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-5xl font-black">
            Before vs After Recycling
          </h2>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-red-500/20 bg-red-500/5 p-10">
              <h3 className="text-4xl font-bold text-red-300">
                Before Recycling
              </h3>

              <ul className="mt-8 space-y-4 text-white/70">
                <li>❌ Landfill Overflow</li>
                <li>❌ Ocean Pollution</li>
                <li>❌ Wildlife Harm</li>
                <li>❌ Resource Waste</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 p-10">
              <h3 className="text-4xl font-bold text-emerald-300">
                After Recycling
              </h3>

              <ul className="mt-8 space-y-4 text-white/70">
                <li>✅ New Products</li>
                <li>✅ Cleaner Environment</li>
                <li>✅ Energy Savings</li>
                <li>✅ Circular Economy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ewaste COLLECTION */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <img
            src={ewasteCollection}
            alt="ewaste Collection"
            className="mx-auto h-[450px] w-full max-w-5xl rounded-[2rem] object-cover shadow-2xl"
          />

          <h2 className="mt-10 text-5xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Step 1: ewaste Collection
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/70">
  The e-waste recycling journey begins with collecting discarded
  electronic devices such as mobile phones, laptops, televisions,
  batteries and household appliances. These items are gathered from
  homes, offices, industries and recycling centers. Proper collection
  prevents hazardous materials from entering landfills and water bodies.
  It also ensures that valuable resources can be recovered and reused
  efficiently in the recycling process.
</p>
        </div>
      </section>

      {/* ewaste SORTING */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <img
            src={ewasteSorting}
            alt="ewaste Sorting"
            className="mx-auto h-[450px] w-full max-w-5xl rounded-[2rem] object-cover shadow-2xl"
          />

          <h2 className="mt-10 text-5xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Step 2: ewaste Sorting
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/70">
  After collection, electronic waste is carefully sorted according to
  device type, material composition and recycling requirements.
  Components containing plastics, metals, batteries and circuit boards
  are separated for specialized processing. Proper sorting improves
  recycling efficiency and increases the recovery rate of valuable
  materials. This stage plays a crucial role in reducing waste and
  maximizing resource utilization.
</p>
        </div>
      </section>

      {/* ewasteDismantling */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <img
            src={ewasteDismantling}
            alt="ewasteDismantling"
            className="mx-auto h-[450px] w-full max-w-5xl rounded-[2rem] object-cover shadow-2xl"
          />

          <h2 className="mt-10 text-5xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Step 3: ewasteDismantling
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/70">
  Electronic devices are carefully dismantled to separate individual
  components such as circuit boards, batteries, screens, wires and
  plastic casings. This process allows recyclers to identify valuable
  materials and hazardous substances. Manual and automated dismantling
  techniques help improve recovery rates while ensuring safe handling of
  potentially dangerous electronic components.
</p>
        </div>
      </section>

      {/* ewasteRecovery*/}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <img
            src={ewasteRecovery}
            alt="ewasteRecovery"
            className="mx-auto h-[450px] w-full max-w-5xl rounded-[2rem] object-cover shadow-2xl"
          />

          <h2 className="mt-10 text-5xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Step 4: ewasteRecovery
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/70">
  Advanced recycling technologies are used to recover valuable materials
  such as copper, aluminium, silver and even small amounts of gold from
  electronic waste. Mechanical, chemical and thermal processes help
  extract these resources efficiently. Recovering metals from e-waste
  reduces the need for mining and conserves natural resources for future
  generations.
</p>
        </div>
      </section>

      {/* ewasteProducts */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <img
            src={ewasteProducts}
            alt="ewasteProducts"
            className="mx-auto h-[450px] w-full max-w-5xl rounded-[2rem] object-cover shadow-2xl"
          />

          <h2 className="mt-10 text-5xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Step 5: New ewasteProducts
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/70">
  Recovered materials are transformed into new electronic products,
  industrial components and manufacturing resources. Recycled metals can
  be used in the production of computers, smartphones, appliances and
  other devices. By reusing valuable materials, industries reduce
  production costs, conserve resources and support a sustainable circular
  economy.
</p>
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-5xl font-black">
            Environmental Impact
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-[2rem] bg-gradient-to-r from-emerald-500 to-green-600 p-8 text-white">
              <h3 className="text-5xl font-black">95%</h3>

<p className="mt-3">
  Recoverable Materials
</p>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-r from-cyan-500 to-blue-600 p-8 text-white">
              <h3 className="text-5xl font-black">🔋</h3>

<p className="mt-3">
  Reduced Toxic Waste
</p>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-r from-purple-500 to-pink-600 p-8 text-white">
              <h3 className="text-5xl font-black">🌍</h3>

<p className="mt-3">
  Cleaner Environment
</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 p-16 text-center">
          <h2 className="text-5xl font-black text-white">
            Every Device Matters
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-white/80">
            By recycling electronic waste responsibly, we recover valuable
resources, reduce pollution and create a safer and more sustainable
future. Every old device recycled today contributes to a cleaner
environment tomorrow.
          </p>
        </div>
      </section>
    </div>
  );
}