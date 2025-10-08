import React from "react";
import Separate from "./Separate";
import InfoCard from "./AboutCard";

const About = () => {
  return (
    <section id="feat_location" className="pt-[70] section-about w-full">
      <div className="max-w-[80%] mx-auto">
        <div className="w-full flex flex-col justify-center items-center gap-4 text-center py-10">
          <h2 className="text-3xl font-semibold text-[#1c1c1c]">À Propos</h2>
          <Separate />
          <div className="w-full py-6">
            <h2 className="lg:text-5xl md:text-4xl text-3xl  text-[#2C3E50] font-semibold text-center">
              Vente+ une plateforme tout en un
            </h2>
            <div className="w-full  flex lg:justify-between items-center flex-wrap md:justify-center gap-y-10 pt-[80]">
              <InfoCard
                title="Une plateforme complète pour votre commerce"
                description=" Simplifiez la gestion de votre commerce avec Vente+.
                Suivez vos ventes, stocks, dettes clients et commandes fournisseurs depuis une seule interface.
                Prenez les bonnes décisions grâce à un tableau de bord clair et intelligent plus de papier, plus d’erreurs, tout est automatisé"
              ></InfoCard>
              <InfoCard
                title="Simplifiez votre quotidien de commerçant"
                description="Gérez votre commerce simplement et efficacement avec Vente+.
                  Suivez vos ventes, vos stocks et vos clients en temps réel.
                  Prenez les bonnes décisions et concentrez-vous sur la croissance de votre activité."
              ></InfoCard>
              <InfoCard
                title="Des résultats concrets, rapidement"
                description="Boostez votre commerce avec Vente+ 
                  Gagnez du temps, réduisez vos pertes et fidélisez vos clients grâce à une gestion simplifiée et intelligente.
                  Une seule plateforme pour piloter vos ventes, vos stocks et vos crédits gratuite au départ, évolutive selon vos besoins."
              ></InfoCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
