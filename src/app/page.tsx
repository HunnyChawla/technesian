"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, LayoutDashboard, Users, Activity, FileText, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Blob Animations */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-strong/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-6"
          >
            <span className="pill bg-primary/10 text-primary-strong px-4 py-1 rounded-full text-sm font-semibold">By Technesian</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
          >
            Revolutionizing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Hospital Management
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Cura is a comprehensive, intuitive, and secure platform designed to streamline your hospital's operations from patient admission to billing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="mailto:technesian.cura@gmail.com">
              <Button size="lg" className="bg-primary hover:bg-primary-strong text-white rounded-full px-8 h-14 text-lg shadow-lg shadow-primary/25">
                Book a Free Demo <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-primary/20 hover:bg-primary/5">
                Explore Features
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Technesian Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 flex justify-center"
            >
              <Image 
                src="/login-logo.png" 
                alt="Technesian Team" 
                width={500} 
                height={400} 
                className="rounded-2xl shadow-2xl object-cover border border-slate-100"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Built by Technesian</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Technesian, we build robust software solutions that solve real-world problems. With Cura, we've poured our expertise into creating a Hospital Management System that doesn't just digitize records, but actively improves healthcare delivery.
              </p>
              <ul className="space-y-4">
                {[
                  "Trusted by healthcare professionals",
                  "Secure, scalable, and reliable architecture",
                  "Dedicated support and continuous updates"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Powerful Features for Modern Hospitals</h2>
            <p className="text-lg text-muted-foreground">Everything you need to run your hospital efficiently, all in one beautifully designed platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
                title: "Analytics Dashboard",
                desc: "Get real-time insights into patient flow, bed occupancy, revenue, and hospital efficiency at a glance."
              },
              {
                icon: <Users className="w-8 h-8 text-accent" />,
                title: "Patient Management",
                desc: "Complete digital patient records with automatic UHID generation, medical history, and integrated OPD visits."
              },
              {
                icon: <Activity className="w-8 h-8 text-primary-strong" />,
                title: "IPD & Queue Management",
                desc: "Efficiently manage wards, beds, admissions, and live patient queues to ensure smooth operations."
              },
              {
                icon: <FileText className="w-8 h-8 text-primary" />,
                title: "Billing & Invoicing",
                desc: "Automated service charge calculations, partial payments, and customizable invoice generation."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="glass h-full hover:shadow-lg transition-shadow duration-300 border-none">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-slate-600">{feature.desc}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to upgrade your hospital?</h2>
            <p className="text-xl text-primary-foreground/90 mb-10">
              Join the growing number of healthcare facilities relying on Cura to deliver better patient care.
            </p>
            <Link href="mailto:technesian.cura@gmail.com">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-slate-50 rounded-full px-10 h-14 text-lg shadow-xl">
                Get Started Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
