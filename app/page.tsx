"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail, MapPin } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  image: string
  category: string
}

interface FloorPlan {
  id: string
  title: string
  description: string
  image: string
  area: string
  bedrooms: string
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    } else {
      const defaultProjects: Project[] = [
        {
          id: "1",
          title: "Modern Residential Complex",
          description: "Luxury apartment building with premium amenities",
          image: "/modern-residential-building-apartment-complex.jpg",
          category: "Residential",
        },
        {
          id: "2",
          title: "Commercial Office Space",
          description: "State-of-the-art office building with sustainable features",
          image: "/modern-commercial-office-building.jpg",
          category: "Commercial",
        },
        {
          id: "3",
          title: "Shopping Mall Development",
          description: "Large-scale retail and entertainment complex",
          image: "/shopping-mall-retail-complex.jpg",
          category: "Commercial",
        },
        {
          id: "4",
          title: "Villa Community Project",
          description: "Gated community with premium villas and landscaping",
          image: "/luxury-villa-community-residential.jpg",
          category: "Residential",
        },
      ]
      setProjects(defaultProjects)
      localStorage.setItem("projects", JSON.stringify(defaultProjects))
    }

    const savedFloorPlans = localStorage.getItem("floorPlans")
    if (savedFloorPlans) {
      setFloorPlans(JSON.parse(savedFloorPlans))
    } else {
      const defaultFloorPlans: FloorPlan[] = [
        {
          id: "1",
          title: "2 BHK Premium",
          description: "Spacious 2 bedroom apartment with modern amenities",
          image: "/floor-plan-2bhk.jpg",
          area: "1200 sq.ft",
          bedrooms: "2 BHK",
        },
        {
          id: "2",
          title: "3 BHK Luxury",
          description: "Luxurious 3 bedroom apartment with balcony",
          image: "/floor-plan-3bhk.jpg",
          area: "1800 sq.ft",
          bedrooms: "3 BHK",
        },
        {
          id: "3",
          title: "4 BHK Penthouse",
          description: "Premium penthouse with terrace garden",
          image: "/floor-plan-4bhk.jpg",
          area: "2500 sq.ft",
          bedrooms: "4 BHK",
        },
      ]
      setFloorPlans(defaultFloorPlans)
      localStorage.setItem("floorPlans", JSON.stringify(defaultFloorPlans))
    }
  }, [])

  const menuItems = [
    { label: "Overview", href: "#projects" },
    { label: "Walkthrough", href: "#walkthrough" },
    { label: "Floor Plans", href: "#floor-plans" },
    { label: "Price List", href: "#price-list" },
    { label: "Location", href: "#location" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[oklch(0.78_0.15_85)]/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-[oklch(0.78_0.15_85)] animate-fade-in">
            Shri Vishnu Waman Thakur Developers
          </h1>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-[oklch(0.78_0.15_85)]/10 rounded-lg transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[oklch(0.78_0.15_85)]" />
            ) : (
              <Menu className="w-6 h-6 text-[oklch(0.78_0.15_85)]" />
            )}
          </button>
        </div>

        <div
          className={`absolute right-0 top-full w-64 bg-black/98 shadow-2xl border-l border-b border-[oklch(0.78_0.15_85)]/30 transition-all duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <div className="p-4 space-y-2">
            {menuItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-[oklch(0.78_0.15_85)] hover:bg-[oklch(0.78_0.15_85)]/10 rounded-lg transition-all duration-200 font-medium animate-slide-in-right border border-transparent hover:border-[oklch(0.78_0.15_85)]/30"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-black bg-[oklch(0.78_0.15_85)] hover:bg-[oklch(0.68_0.15_85)] rounded-lg transition-all duration-200 font-medium animate-slide-in-right shadow-lg"
              style={{ animationDelay: "250ms" }}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
              <button
                className="w-full text-left px-4 py-3 text-[oklch(0.78_0.15_85)]/70 hover:text-[oklch(0.78_0.15_85)] hover:bg-[oklch(0.78_0.15_85)]/5 rounded-lg transition-all duration-200 text-sm border-t border-[oklch(0.78_0.15_85)]/20 mt-2 animate-slide-in-right"
                style={{ animationDelay: "300ms" }}
              >
                Admin Login
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-black via-[oklch(0.2_0.05_85)] to-black text-white py-20 px-4 animate-fade-in relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.78_0.15_85)_0%,transparent_50%)] opacity-10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance animate-slide-up text-[oklch(0.78_0.15_85)]">
            Shri Vishnu Waman Thakur Developers
          </h2>
          <p className="text-xl text-gray-300 mb-8 text-balance animate-slide-up" style={{ animationDelay: "200ms" }}>
            Building Excellence, Delivering Dreams. Quality construction and development projects across residential and
            commercial sectors.
          </p>
          <Button
            size="lg"
            className="bg-[oklch(0.78_0.15_85)] text-black hover:bg-[oklch(0.68_0.15_85)] hover:scale-105 transition-all duration-300 animate-slide-up shadow-lg font-semibold"
            style={{ animationDelay: "400ms" }}
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Our Projects
          </Button>
        </div>
      </section>

      <section id="projects" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-neutral-900 mb-4 text-balance animate-fade-in">Our Projects</h2>
        <p className="text-neutral-600 mb-12 text-lg animate-fade-in" style={{ animationDelay: "100ms" }}>
          Showcasing our completed and ongoing developments
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-scale"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 w-full bg-neutral-200 overflow-hidden group">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-neutral-900">{project.title}</h3>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium animate-pulse-slow">
                    {project.category}
                  </span>
                </div>
                <p className="text-neutral-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-neutral-600 text-lg">No projects to display yet.</p>
          </div>
        )}
      </section>

      <section id="floor-plans" className="bg-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[oklch(0.78_0.15_85)] mb-4 text-balance animate-fade-in">
            Floor Plans
          </h2>
          <p className="text-gray-400 mb-12 text-lg animate-fade-in" style={{ animationDelay: "100ms" }}>
            Explore our thoughtfully designed floor plans
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {floorPlans.map((plan, index) => (
              <div
                key={plan.id}
                className="bg-neutral-900 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl border border-[oklch(0.78_0.15_85)]/20 transition-all duration-300 hover:-translate-y-2 animate-fade-in-scale"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 w-full bg-neutral-800 overflow-hidden group">
                  <Image
                    src={plan.image || "/placeholder.svg"}
                    alt={plan.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-[oklch(0.78_0.15_85)]">{plan.title}</h3>
                    <span className="bg-[oklch(0.78_0.15_85)]/10 text-[oklch(0.78_0.15_85)] px-3 py-1 rounded-full text-sm font-medium border border-[oklch(0.78_0.15_85)]/30">
                      {plan.bedrooms}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-3">{plan.description}</p>
                  <p className="text-[oklch(0.78_0.15_85)] font-semibold">{plan.area}</p>
                </div>
              </div>
            ))}
          </div>

          {floorPlans.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-gray-400 text-lg">No floor plans available yet.</p>
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="bg-neutral-900 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[oklch(0.78_0.15_85)] mb-8 text-balance animate-fade-in text-center">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black p-8 rounded-lg shadow-lg hover:shadow-2xl border border-[oklch(0.78_0.15_85)]/20 transition-all duration-300 hover:-translate-y-1 animate-fade-in-scale text-center">
              <div className="w-16 h-16 bg-[oklch(0.78_0.15_85)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-[oklch(0.78_0.15_85)]" />
              </div>
              <h3 className="text-2xl font-bold text-[oklch(0.78_0.15_85)] mb-3">Call Now</h3>
              <a href="tel:+919876543210" className="text-gray-300 hover:text-[oklch(0.78_0.15_85)] transition-colors">
                +91 98765 43210
              </a>
            </div>
            <div
              className="bg-black p-8 rounded-lg shadow-lg hover:shadow-2xl border border-[oklch(0.78_0.15_85)]/20 transition-all duration-300 hover:-translate-y-1 animate-fade-in-scale text-center"
              style={{ animationDelay: "100ms" }}
            >
              <div className="w-16 h-16 bg-[oklch(0.78_0.15_85)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-[oklch(0.78_0.15_85)]" />
              </div>
              <h3 className="text-2xl font-bold text-[oklch(0.78_0.15_85)] mb-3">Email Us</h3>
              <a
                href="mailto:info@svwtdevelopers.com"
                className="text-gray-300 hover:text-[oklch(0.78_0.15_85)] transition-colors break-all"
              >
                info@svwtdevelopers.com
              </a>
            </div>
            <div
              className="bg-black p-8 rounded-lg shadow-lg hover:shadow-2xl border border-[oklch(0.78_0.15_85)]/20 transition-all duration-300 hover:-translate-y-1 animate-fade-in-scale text-center"
              style={{ animationDelay: "200ms" }}
            >
              <div className="w-16 h-16 bg-[oklch(0.78_0.15_85)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-[oklch(0.78_0.15_85)]" />
              </div>
              <h3 className="text-2xl font-bold text-[oklch(0.78_0.15_85)] mb-3">Visit Us</h3>
              <p className="text-gray-300">
                123 Construction Lane
                <br />
                Mumbai, Maharashtra 400001
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-16 px-4 border-t border-[oklch(0.78_0.15_85)]/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[oklch(0.78_0.15_85)] mb-8 text-balance animate-fade-in">About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description:
                  "Committed to delivering high-quality construction projects that exceed client expectations.",
              },
              {
                title: "Innovation",
                description: "Using modern techniques and sustainable practices in all our developments.",
              },
              {
                title: "Trust",
                description: "Building relationships based on transparency, reliability, and quality.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="bg-neutral-900 p-8 rounded-lg shadow-lg hover:shadow-2xl border border-[oklch(0.78_0.15_85)]/20 transition-all duration-300 hover:-translate-y-1 animate-fade-in-scale"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <h3 className="text-2xl font-bold text-[oklch(0.78_0.15_85)] mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-[oklch(0.78_0.15_85)]/20 text-gray-400 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 Shri Vishnu Waman Thakur Developers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
