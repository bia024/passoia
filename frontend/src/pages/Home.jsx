import React from "react";
import Hero from "../components/Hero/Hero.jsx";
import { Helmet } from "react-helmet-async";
import "./Home.scss";
import Fidelidade from "../components/Fidelidade/Fidelidade.jsx";

export default function Home() {
  return (
    <main>
      <Helmet>
        <title>Passoia - Beleza que Inspira</title>
        <meta
          name="description"
          content="Descubra as últimas tendências em maquiagem e cuidados com a pele."
        />
      </Helmet>

      <Hero />

      <Fidelidade />
    </main>
  );
}
