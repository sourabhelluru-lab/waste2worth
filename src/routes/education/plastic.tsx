import { createFileRoute } from "@tanstack/react-router";

import plasticHero from "@/assets/recycling/plastic-hero.jpg";
import plasticCollection from "@/assets/recycling/plastic-collection.jpg";
import plasticSorting from "@/assets/recycling/plastic-sorting.jpg";
import plasticShredding from "@/assets/recycling/plastic-shredding.jpg";
import plasticPelletizing from "@/assets/recycling/plastic-pelletizing.jpg";
import plasticProducts from "@/assets/recycling/plastic-products.jpg";

export const Route = createFileRoute("/education/plastic")({
  component: PlasticPage,
});

function PlasticPage() {
  return (
    <div className="bg-[#031416] text-white">
      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        <img
          src={plasticHero}
          alt="Plastic Pollution"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-5xl text-center text-white">
            <div className="mb-8 text-8xl">♻️</div>

            <h1 className="text-6xl font-black md:text-8xl">
              Plastic Recycling
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-xl text-white/80 md:text-2xl">
              Transforming discarded plastic into valuable resources and
              building a cleaner, greener future.
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

      {/* PLASTIC CRISIS */}
      <section id="journey" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-5xl font-black md:text-6xl">
              The Plastic Crisis
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/70">
              Millions of tonnes of plastic enter oceans and landfills every
              year. Recycling is one of the most effective ways to reduce
              pollution and protect our environment.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-[2rem] border border-red-500/20 bg-red-500/5 p-8 backdrop-blur-xl hover:-translate-y-2 transition">
              <div className="text-6xl">🌊</div>
              <h3 className="mt-6 text-5xl font-black">8M+</h3>
              <p className="mt-3 text-white/70">
                Tonnes enter oceans every year
              </p>
            </div>

            <div className="rounded-[2rem] border border-orange-500/20 bg-orange-500/5 p-8 backdrop-blur-xl hover:-translate-y-2 transition">
              <div className="text-6xl">🐢</div>
              <h3 className="mt-6 text-5xl font-black">100K+</h3>
              <p className="mt-3 text-white/70">
                Marine animals affected
              </p>
            </div>

            <div className="rounded-[2rem] border border-yellow-500/20 bg-yellow-500/5 p-8 backdrop-blur-xl hover:-translate-y-2 transition">
              <div className="text-6xl">⏳</div>
              <h3 className="mt-6 text-5xl font-black">450+</h3>
              <p className="mt-3 text-white/70">
                Years to decompose
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

      {/* COLLECTION */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <img
            src={plasticCollection}
            alt="Collection"
            className="mx-auto h-[450px] w-full max-w-5xl rounded-[2rem] object-cover shadow-2xl"
          />

          <h2 className="mt-10 text-5xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Step 1: Collection
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/70">
  The recycling journey begins with the collection of plastic waste from
  households, offices, industries and public spaces. Waste collection
  systems help prevent plastic from reaching rivers, oceans and landfills.
  Proper collection ensures that valuable materials are recovered and
  prepared for further processing in recycling facilities.
</p>
        </div>
      </section>

      {/* SORTING */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <img
            src={plasticSorting}
            alt="Sorting"
            className="mx-auto h-[450px] w-full max-w-5xl rounded-[2rem] object-cover shadow-2xl"
          />

          <h2 className="mt-10 text-5xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Step 2: Sorting
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/70">
  Once collected, plastics are carefully sorted according to their type,
  color and quality. Different plastics require different recycling
  methods, making this step extremely important. Advanced sorting
  technologies improve efficiency and ensure that high-quality recycled
  materials can be produced.
</p>
        </div>
      </section>

      {/* SHREDDING */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <img
            src={plasticShredding}
            alt="Shredding"
            className="mx-auto h-[450px] w-full max-w-5xl rounded-[2rem] object-cover shadow-2xl"
          />

          <h2 className="mt-10 text-5xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Step 3: Shredding
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/70">
  After sorting, plastic materials are shredded into smaller pieces or
  flakes. Shredding increases the surface area of the material, making it
  easier to clean and process. This step also removes bulky shapes and
  prepares the plastic for the next stage of recycling.
</p>
        </div>
      </section>

      {/* PELLETIZING */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <img
            src={plasticPelletizing}
            alt="Pelletizing"
            className="mx-auto h-[450px] w-full max-w-5xl rounded-[2rem] object-cover shadow-2xl"
          />

          <h2 className="mt-10 text-5xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Step 4: Pelletizing
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/70">
  Clean plastic flakes are melted and transformed into small pellets.
  These pellets serve as a valuable raw material for manufacturers.
  Pelletizing helps standardize recycled plastic and makes it easier to
  transport, store and reuse in large-scale production processes.
</p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <img
            src={plasticProducts}
            alt="Products"
            className="mx-auto h-[450px] w-full max-w-5xl rounded-[2rem] object-cover shadow-2xl"
          />

          <h2 className="mt-10 text-5xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Step 5: New Products
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/70">
  Recycled plastic pellets are used to manufacture a wide variety of
  products including bottles, containers, packaging materials, furniture
  and construction items. By creating new products from recycled
  materials, industries reduce resource consumption and support a
  sustainable circular economy.
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
              <h3 className="text-5xl font-black">32%</h3>
              <p className="mt-3">
                Less Energy Consumption
              </p>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-r from-cyan-500 to-blue-600 p-8 text-white">
              <h3 className="text-5xl font-black">♻️</h3>
              <p className="mt-3">
                Reduced Landfill Waste
              </p>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-r from-purple-500 to-pink-600 p-8 text-white">
              <h3 className="text-5xl font-black">🌍</h3>
              <p className="mt-3">
                Cleaner Planet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 p-16 text-center">
          <h2 className="text-5xl font-black text-white">
            Every Bottle Counts
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-white/80">
            By recycling today, we reduce pollution, conserve resources and
            create a more sustainable future.
          </p>
        </div>
      </section>
    </div>
  );
}