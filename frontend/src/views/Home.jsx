import React from 'react'
import BaseLayout from "../layouts/BaseLayout";
import FeatureCard from "./Home/FeatureCard";
import HeroCard from "./Home/HeroCard";

function Home() {
  return (
    <BaseLayout>
      <HeroCard></HeroCard>
      <FeatureCard></FeatureCard>
    </BaseLayout>
  );
}

export default Home
