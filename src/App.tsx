import { TopBar } from "@/components/TopBar/TopBar";
import { Header } from "@/components/Header/Header";
import { CategoryGrid } from "@/components/CategoryGrid/CategoryGrid";
import { BestSellers } from "@/components/BestSellers/BestSellers";
import { Services } from "@/components/Services/Services";
import { FeaturedPosts } from "@/components/FeaturedPosts/FeaturedPosts";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { CallToAction } from "@/components/CallToAction/CallToAction";
import { Footer } from "@/components/Footer/Footer";

/** Section order matches the Figma frames top to bottom. */
export function App() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <CategoryGrid />
        <BestSellers />
        <Services />
        <FeaturedPosts />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
