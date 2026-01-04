import Head from "next/head";
import { Box } from "@mui/material";
import Navbar from "@/components/index/Navbar";
import HeroSection from "@/components/index/HeroSection";
import ProductGallery from "@/components/index/ProductGallery";
import FeatureSteps from "@/components/index/FeatureSteps";
import Testimonials from "@/components/index/Testimonials";
import PlatformLogos from "@/components/index/PlatformLogos";
import CTASection from "@/components/index/CTASection";
import Footer from "@/components/index/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Artloom - Create & Sell Your Merchandise</title>
        <meta name="description" content="Turn your creativity into products. Design, sell, and ship custom merchandise without holding any inventory." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: "#FDF8F2",
        }}
      >
        <Navbar />
        <HeroSection />
        <ProductGallery />
        <FeatureSteps />
        <Testimonials />
        <PlatformLogos />
        <CTASection />
        <Footer />
      </Box>
    </>
  );
}
