import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryGrid from "@/components/CategoryGrid";
import BestSellers from "@/components/BestSellers";
import Services from "@/components/Services";
import FeaturedPosts from "@/components/FeaturedPosts";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
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
        <CTA />
      </main>
      <Footer />
    </>
  );
}
