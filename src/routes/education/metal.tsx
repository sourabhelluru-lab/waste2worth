import { createFileRoute } from "@tanstack/react-router";

import metalHero from "@/assets/recycling/metal-hero.jpg";
import metalCollection from "@/assets/recycling/metal-collection.jpg";
import metalSorting from "@/assets/recycling/metal-sorting.jpg";
import metalShredding from "@/assets/recycling/metal-shredding.jpg";
import metalMelting from "@/assets/recycling/metal-melting.jpg";
import metalProducts from "@/assets/recycling/metal-products.jpg";

export const Route = createFileRoute("/education/metal")({
  component: MetalPage,
});

function MetalPage() {
  return (
    <div className="bg-[#031416] text-white">
      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        <img
          src={metalHero}
          alt="metal Pollution"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-5xl text-center text-white">
            <div className="mb-8 text-8xl"></div>

            <h1 className="text-6xl font-black md:text-8xl">
              Metal Recycling
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-xl text-white/80 md:text-2xl">
              Transforming used metals into valuable raw materials while
conserving natural resources and reducing environmental impact.
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

      {/*Why Metal Recycling Matters*/}
      <section id="journey" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-5xl font-black md:text-6xl">
              The Metal Crisis
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70">
              Metals such as steel, aluminium and copper can be recycled
repeatedly without losing quality. Recycling metals reduces
mining activities, saves energy and conserves natural resources.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-[2rem] border border-red-500/20 bg-red-500/5 p-8 backdrop-blur-xl hover:-translate-y-2 transition">
              <div className="text-6xl">🌊</div>
              <h3 className="mt-6 text-5xl font-black">95%</h3>
              <p className="mt-3 text-white/70">
Energy Saved Through Recycling
              </p>
            </div>

            <div className="rounded-[2rem] border border-orange-500/20 bg-orange-500/5 p-8 backdrop-blur-xl hover:-translate-y-2 transition">
              <div className="text-6xl">🐢</div>
              <h3 className="mt-6 text-5xl font-black">⛏️</h3>
              <p className="mt-3 text-white/70">
Less Mining
Natural Resources Protected
              </p>
            </div>

            <div className="rounded-[2rem] border border-yellow-500/20 bg-yellow-500/5 p-8 backdrop-blur-xl hover:-translate-y-2 transition">
              <div className="text-6xl">⏳</div>
              <h3 className="mt-6 text-5xl font-black">♻️</h3>
              <p className="mt-3 text-white/70">
                Infinite
Recyclability
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

      {/* Metal COLLECTION */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <img
            src={metalCollection}
            alt="Collection"
            className="mx-auto h-[450px] w-full max-w-5xl rounded-[2rem] object-cover shadow-2xl"
          />

          <h2 className="mt-10 text-5xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Step 1: Collection
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/70">
  Metal recycling begins with collecting scrap metal from homes,
construction sites, factories and recycling centers. Aluminium
cans, steel products and copper wires are gathered and prepared
for processing. Efficient collection helps recover valuable
materials that would otherwise be wasted.
</p>
        </div>
      </section>

      {/* Metal SORTING */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <img
            src={metalSorting}
            alt="Sorting"
            className="mx-auto h-[450px] w-full max-w-5xl rounded-[2rem] object-cover shadow-2xl"
          />

          <h2 className="mt-10 text-5xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Step 2: Sorting
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/70">
  Collected metals are sorted according to their composition and
quality. Ferrous metals such as iron and steel are separated
from non-ferrous metals like aluminium and copper. Proper
sorting improves recycling efficiency and product quality.
</p>
        </div>
      </section>

      {/* Metal SHREDDING */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <img
            src={metalShredding}
            alt="Shredding"
            className="mx-auto h-[450px] w-full max-w-5xl rounded-[2rem] object-cover shadow-2xl"
          />

          <h2 className="mt-10 text-5xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Step 3: Shredding
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/70">
  Large metal objects are shredded into smaller pieces to make
transportation and processing easier. Shredding increases
surface area and improves the efficiency of melting and
purification operations.
</p>
        </div>
      </section>

      {/* Metal Melting */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <img
            src={metalMelting}
            alt="Melting"
            className="mx-auto h-[450px] w-full max-w-5xl rounded-[2rem] object-cover shadow-2xl"
          />

          <h2 className="mt-10 text-5xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Step 4: Melting
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/70">
  The shredded metal is melted in specialized furnaces at high
temperatures. During this process impurities are removed and
the purified molten metal is prepared for manufacturing new
products.
</p>
        </div>
      </section>

      {/* Metal PRODUCTS */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <img
            src={metalProducts}
            alt="Products"
            className="mx-auto h-[450px] w-full max-w-5xl rounded-[2rem] object-cover shadow-2xl"
          />

          <h2 className="mt-10 text-5xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Step 5: New Products
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/70">
  Recycled metals are transformed into new vehicles, machinery,
construction materials, cans and industrial products. Metal
recycling supports a circular economy and reduces dependence
on newly mined resources.
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
Energy Saved
              </p>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-r from-cyan-500 to-blue-600 p-8 text-white">
              <h3 className="text-5xl font-black">♻️</h3>
              <p className="mt-3">
                ⛏️
Reduced Mining
              </p>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-r from-purple-500 to-pink-600 p-8 text-white">
              <h3 className="text-5xl font-black">🏭</h3>
              <p className="mt-3">
Lower Emissions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 p-16 text-center">
          <h2 className="text-5xl font-black text-white">
            Every Scrap Metal Piece Counts
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-white/80">
            By recycling metal today, we conserve valuable natural
resources, reduce mining activities and create a more
sustainable future for generations to come.
          </p>
        </div>
      </section>
    </div>
  );
}