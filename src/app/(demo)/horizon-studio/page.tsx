'use client';

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Code, Globe, Car, Rocket } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

export default function HorizonStudioPage() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const headerRef = useRef(null);
  const sidebar = useSidebarToggle((state) => state);

  const toggleQuestion = (question: string) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  useEffect(() => {
    const currentRef = headerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const faqItems = [
    {
      question: "Comment récupérer ma commande ?",
      answer: "Pour récupérer votre commande, rejoignez notre serveur Discord et allez dans le salon 'Order Claim' [Protection Escrow]."
    },
    {
      question: "Quels types de produits propose Horizon Studio ?",
      answer: "Nous proposons des scripts, mappings et véhicules spécialement conçus pour les serveurs FiveM. Nos créations sont optimisées, originales et adaptées aux besoins des communautés GTARP et FivePD."
    },
    {
      question: "Comment télécharger un produit après achat ?",
      answer: "Une fois votre achat effectué, vous recevrez un lien de téléchargement directement dans votre compte client. Si vous ne trouvez pas votre produit, vérifiez votre boîte mail (y compris les spams) ou contactez notre support via le formulaire de contact."
    },
    {
      question: "Puis-je obtenir de l'aide pour l'installation d'un produit ?",
      answer: "Oui, nous offrons un support technique pour tous nos produits. Si vous rencontrez des difficultés, vous pouvez nous contacter via notre système de tickets ou rejoindre notre serveur Discord pour obtenir l'aide de notre équipe."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header Sticky */}
      <div className={`fixed top-0 left-0 right-0 z-40 transition-opacity duration-300 ${
        isHeaderVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className={cn(
          "mx-auto px-4 py-3 flex items-center bg-background/50 backdrop-blur-md rounded-b-lg justify-center",
          sidebar?.isOpen === false ? "ml-[90px]" : "ml-72"
        )}>
          <Image
            src="/Logo_DEV_PNG.png"
            alt="Horizon Studio Logo"
            width={40}
            height={40}
            className="opacity-90 hover:opacity-100 transition-opacity"
          />
          <span className="ml-3 text-lg font-semibold text-foreground/90">
            Horizon Studio
          </span>

        </div>
      </div>

      {/* Hero Section */}
      <section ref={headerRef} className="relative h-[80vh] flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <Image
            src="/studio-bg.jpg"
            alt="Horizon Studio Background"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-4xl px-4">

          <Badge variant="outline" className="mb-4">
            <Rocket className="w-4 h-4 mr-2" />
            Studio Français
          </Badge>
          
          <div className="flex justify-center items-center gap-2">          
            <Image
            src="/Logo_DEV_PNG.png"
            alt="Horizon Studio Logo"
            width={40}
            height={40}
            className="opacity-90 hover:opacity-100 transition-opacity"
          />
            <h1 className="text-5xl font-bold tracking-tight">
              Horizon Studio
            </h1>
          </div>
          <p className="mt-4 text-xl text-muted-foreground">
            Studio français spécialisé dans la création de scripts, mappings et véhicules pour FiveM.
            Notre équipe allie créativité et précision technique pour des expériences uniques.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button asChild>
              <Link href="https://horizonstudio.shop/" target="_blank">
                Visiter notre Shop
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://discord.com/invite/6ebaEQaq8A" target="_blank">
                Rejoindre notre Discord
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nos Domaines d&apos;Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow">
              <Code className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Scripts FiveM</h3>
              <p className="text-muted-foreground">
                Création de scripts optimisés et personnalisés pour vos serveurs RP
              </p>
            </div>
            <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow">
              <Globe className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Mappings</h3>
              <p className="text-muted-foreground">
                Conception de cartes et d&apos;environnements immersifs
              </p>
            </div>
            <div className="p-6 rounded-lg border hover:shadow-lg transition-shadow">
              <Car className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Véhicules</h3>
              <p className="text-muted-foreground">
                Modélisation et intégration de véhicules personnalisés
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nos Produits Phares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Product 1 */}
            <div className="p-8 bg-background rounded-lg shadow-sm flex flex-col items-center text-center">
              <Image
                src="/gav-banner.jpg"
                alt="Police Cell Management"
                width={200}
                height={200}
                className="rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">Police Cell Management</h3>
              <p className="text-muted-foreground mb-4">
                Système complet de gestion des cellules de police
              </p>
              <div className="text-2xl font-bold text-primary mb-4">
                15.00€
              </div>
              <Button asChild>
                <Link href="https://horizonstudio.shop/products/police-cell-management" target="_blank">
                  Voir sur le Shop
                </Link>
              </Button>
            </div>

            {/* Product 2 */}
            <div className="p-8 bg-background rounded-lg shadow-sm flex flex-col items-center text-center">
              <Image
                src="/announce-system.jpg"
                alt="Advanced Announce System"
                width={200}
                height={200}
                className="rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">Advanced Announce System</h3>
              <p className="text-muted-foreground mb-4">
                Système d&apos;annonces avancé pour serveurs RP
              </p>
              <div className="text-2xl font-bold text-primary mb-4">
                12.00€
              </div>
              <Button asChild>
                <Link href="https://horizonstudio.shop/products/advanced-announce-system" target="_blank">
                  Voir sur le Shop
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Combined Dev & Story Section */}
      <section className="py-20">
        <div className="container max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Dev Section - Left */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold mb-8">
                Notre Équipe
              </h2>
              <div className="space-y-8">
                {/* Dev Kerwan */}
                <div className="p-6 bg-background rounded-lg shadow-sm flex items-center gap-6">
                  <Image
                    src="/kerwan.jpg"
                    alt="Kerwan"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-2xl font-bold">Kerwan</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-muted-foreground">
                        FiveM Developer
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dev Jak */}
                <div className="p-6 bg-background rounded-lg shadow-sm flex items-center gap-6">
                  <Image
                    src="/jak.jpg"
                    alt="Jak"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-2xl font-bold">Jak</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-muted-foreground">
                        FiveM Developer
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Section - Right */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold mb-8">
                Notre Histoire
              </h2>
              <p className="text-muted-foreground pt-6">
                Animés par une passion commune pour FiveM, notre mission <br /> était claire : repousser les limites du roleplay et offrir des expériences véritablement uniques. 
                 Avec une équipe talentueuse et un engagement sans faille, le studio continue d&apos;innover, répondant aux attentes des joueurs et des créateurs. 
                L&apos;aventure est loin d&apos;être terminée, et nous attendons avec impatience de partager le prochain chapitre de ce voyage avec vous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="container max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ils nous font confiance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Rewind RP */}
            <div className="p-8 bg-background rounded-lg shadow-sm flex flex-col items-center text-center">
              <Image
                src="/rewind-rp.jpg"
                alt="Rewind RP"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">Rewind RP</h3>
              <p className="text-muted-foreground">
                Serveur RP français utilisant nos scripts pour une expérience immersive et fluide
              </p>
            </div>

            {/* Petite Alsace RP */}
            <div className="p-8 bg-background rounded-lg shadow-sm flex flex-col items-center text-center">
              <Image
                src="/petite-alsace-rp.jpg"
                alt="Petite Alsace RP"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">Petite Alsace RP</h3>
              <p className="text-muted-foreground">
                Communauté RP alsacienne bénéficiant de nos solutions personnalisées
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/10">
        <div className="container max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Questions Fréquentes
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-background rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleQuestion(item.question)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/10 transition-colors"
                >
                  <h3 className="text-xl font-semibold">
                    {item.question}
                  </h3>
                  <span className={cn(
                    "ml-4 transform transition-transform duration-300",
                    openQuestion === item.question ? "rotate-180" : "rotate-0"
                  )}>
                    ▼
                  </span>
                </button>
                <div
                  className={cn(
                    "transition-all duration-300 ease-in-out",
                    openQuestion === item.question ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-6 pb-6 text-muted-foreground">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
} 