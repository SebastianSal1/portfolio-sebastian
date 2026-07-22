import Hero from "@/components/Hero";
import AboutSnapshot from "@/components/AboutSnapshot";
import SelectedWork from "@/components/SelectedWork";
import CareerTimeline from "@/components/CareerTimeline";
import Awards from "@/components/Awards";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import LightboxProvider from "@/components/LightboxProvider";
import {
  getAllWorkCards,
  getCardsByCategory,
  getFeaturedCards,
} from "@/lib/work";

export default async function Page() {
  const cards = await getAllWorkCards();
  const featured = getFeaturedCards(cards);
  const byCategory = {
    internship: getCardsByCategory(cards, "internship"),
    competition: getCardsByCategory(cards, "competition"),
  };

  return (
    <LightboxProvider cards={cards}>
      <Hero
        name="Sebastian Lumme"
        eyebrow="Institut Teknologi Bandung · Industrial Engineering"
        thesis="I turn ambiguous business questions into structured, defensible decisions — across markets, operations, and delivery."
        chips={["CGPA 3.83 / 4.0", "5× National Winner"]}
        email="sebastiansalutare@gmail.com"
        cvUrl="/cv.pdf"
        linkedin="https://linkedin.com/in/sebastian-salutare/"
        portraitSrc="/me/portrait.webp"
        portraitAlt="Sebastian Lumme"
      />

      <AboutSnapshot />

      <SelectedWork featured={featured} byCategory={byCategory} />

      <CareerTimeline />

      <Awards />

      <Skills />

      <Contact
        email="sebastiansalutare@gmail.com"
        linkedin="https://linkedin.com/in/sebastian-salutare/"
        cvUrl="/cv.pdf"
      />
    </LightboxProvider>
  );
}
