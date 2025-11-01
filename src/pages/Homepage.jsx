import Hero from "../components/home/Hero.jsx";
import FeaturedEvents from "../components/home/FeaturedEvents.jsx";
import CTASection from "../components/home/CTASection.jsx";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <FeaturedEvents maxItems={3} />
        <CTASection />
      </main>
    </div>
  );
}
