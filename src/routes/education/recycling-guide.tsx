import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/education/recycling-guide')({
  component: RouteComponent,
})

function RouteComponent() {
  const materials = [
    {
      title: "Plastic Recycling",
      desc: "Discover how bottles, containers and packaging are transformed into reusable materials.",
      emoji: "♻️",
      path: "/education/plastic",
    },
    {
      title: "E-Waste Recycling",
      desc: "Learn how phones, laptops and circuit boards are dismantled and recovered.",
      emoji: "💻",
      path: "/education/ewaste",
    },
    {
      title: "Paper Recycling",
      desc: "See how newspapers, books and office paper become new products.",
      emoji: "📄",
      path: "/education/paper",
    },
    {
      title: "Metal Recycling",
      desc: "Explore the journey of aluminium, iron and copper through recycling.",
      emoji: "⚙️",
      path: "/education/metal",
    },
    {
      title: "Glass Recycling",
      desc: "Understand how glass bottles and jars are processed and reused.",
      emoji: "🍾",
      path: "/education/glass",
    },
    {
      title: "Cardboard Recycling",
      desc: "Follow the transformation of packaging waste into new cardboard products.",
      emoji: "📦",
      path: "/education/cardboard",
    },
  ];

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="font-display text-5xl font-bold gradient-text">
            Recycling Education Center
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-muted-foreground">
            Discover how recyclable materials are collected, processed and
            transformed into valuable new products while reducing environmental
            impact.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {materials.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="group overflow-hidden rounded-3xl glass shadow-elegant transition-all hover:-translate-y-2 hover:shadow-glow cursor-pointer block"
            >
              <div className="flex h-56 items-center justify-center bg-gradient-to-br from-emerald-400/30 to-cyan-500/30 text-7xl transition-transform duration-500 group-hover:scale-110">
                {item.emoji}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  {item.desc}
                </p>

                <div className="mt-5 font-medium text-primary">
                  Learn More →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}