import Hero from "@/components/home/Hero";
import ServiceCards from "@/components/home/ServiceCards";
import TrustAndInfo from "@/components/home/TrustAndInfo"; // <-- Ye import add kiya
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#fafafa]">
      {/* Background Graphical Glows for Premium Look */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00a63e]/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-[#00a63e]/10 blur-[100px] rounded-full pointer-events-none"></div>

      <main className="relative z-10">
        
        {/* 1. Hero Section */}
        <Hero />
        
        {/* Modern Section Divider */}
        <div className="flex justify-center my-8 opacity-20">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#00a63e] to-transparent"></div>
        </div>

        {/* 2. Service/Tool Cards */}
        <ServiceCards />

        {/* 3. Trust Signals & Informational Section */}
        <TrustAndInfo />

        {/* 4. Marketplace / Featured Products */}
        <FeaturedProducts />

      </main>
    </div>
  );
}