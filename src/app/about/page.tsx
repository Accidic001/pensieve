// app/about/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

// Unsplash images config
const unsplashImages = {
  hero: {
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format",
    alt: "Workspace with notebook and pen",
    credit: "by Accidic"
  },
  mission1: {
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format",
    alt: "Team discussion",
    credit: "Photo by Surface on Unsplash"
  },
  mission2: {
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format",
    alt: "People collaborating",
    credit: "Photo by LinkedIn Sales Navigator on Unsplash"
  },
  team: [
    {
      url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format",
      alt: "Portrait of man",
    },
    
    {
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format",
      alt: "Portrait of woman",
    },

    {
      url: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format",
      alt: "Portrait of man",
    },

    {
      url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format",
      alt: "Portrait of woman",
    }
  ]
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Founder",
      bio: "Passionate about community building"
    },
    {
      name: "Jane Smith",
      role: "Developer",
      bio: "Loves creating intuitive interfaces"
    },
    {
      name: "Alex Johnson",
      role: "Designer",
      bio: "Focused on user experience"
    },
    {
      name: "Sam Wilson",
      role: "Community Manager",
      bio: "Keeps conversations productive"
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="container mx-auto px-4 py-8"
    >
      {/* Hero Section */}
      <motion.section variants={fadeIn} className="relative mb-12 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src={unsplashImages.hero.url}
          alt={unsplashImages.hero.alt}
          width={1200}
          height={600}
          className="w-full h-96 object-cover"
          priority
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-20 text-center -mt-40 px-4"
        >
          <h1 className="text-4xl font-bold mb-4 text-white">About Pensieve</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            A modern platform for thoughtful discussions and knowledge sharing.
          </p>
          <p className="text-xs text-white/70 mt-4">
            {unsplashImages.hero.credit}
          </p>
        </motion.div>
      </motion.section>

      <Separator className="my-8" />

      {/* Mission Section */}
      <motion.section variants={fadeInUp} className="mb-12">
        <motion.h2 variants={fadeInUp} className="text-3xl font-semibold mb-6">
          Our Mission
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Foster Meaningful Discussions",
              description: "We believe in the power of thoughtful conversation to expand perspectives.",
              image: unsplashImages.mission1
            },
            {
              title: "Share Knowledge Freely",
              description: "Our platform encourages open sharing of expertise.",
              image: unsplashImages.mission2
            }
          ].map((item, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="relative h-48"
                >
                  <Image
                    src={item.image.url}
                    alt={item.image.alt}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent >
                <p className="line-clamp-4">{item.description}</p>
                  
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section variants={fadeInUp} className="mb-12">
        <motion.h2 variants={fadeInUp} className="text-3xl font-semibold mb-6">
          The Team
        </motion.h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              transition={{ type: "spring" }}
            >
              <Card className="text-center overflow-hidden h-full">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative h-48 w-full"
                >
                  <Image
                    src={unsplashImages.team[index].url}
                    alt={unsplashImages.team[index].alt}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={fadeInUp}
        className="text-center"
      >
        <Button asChild size="lg" className="hover:scale-105 transition-transform">
          <Link href="/">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.section>
    </motion.div>
  );
}