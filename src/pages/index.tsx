import Hero from "@/components/organism/Hero";
import Companies from "@/components/organism/Companies";
import Categories from "@/components/organism/Categories";
import ChoiseRole from "@/components/organism/ChoiseRole";
import InfoProfile from "@/components/organism/InfoProfile";

export default function Home() {
  return (
    <main>
      <Hero />
      <Companies />
      <Categories />
      <InfoProfile />
      <ChoiseRole />
    </main>
  );
}
