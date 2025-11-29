"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"

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

export default function AdminDashboard() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([])
  const [activeTab, setActiveTab] = useState<"projects" | "floorPlans">("projects")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Residential",
    image: "",
  })
  const [floorPlanFormData, setFloorPlanFormData] = useState({
    title: "",
    description: "",
    area: "",
    bedrooms: "",
    image: "",
  })
  const [imagePreview, setImagePreview] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuthenticated = sessionStorage.getItem("admin_authenticated")
      if (!isAuthenticated) {
        router.push("/admin")
        return
      }

      const savedProjects = localStorage.getItem("projects")
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects))
      }

      const savedFloorPlans = localStorage.getItem("floorPlans")
      if (savedFloorPlans) {
        setFloorPlans(JSON.parse(savedFloorPlans))
      }
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated")
    router.push("/admin")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const dataUrl = reader.result as string
        setImagePreview(dataUrl)
        setFormData((prev) => ({ ...prev, image: dataUrl }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFloorPlanImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const dataUrl = reader.result as string
        setImagePreview(dataUrl)
        setFloorPlanFormData((prev) => ({ ...prev, image: dataUrl }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill all fields and upload an image")
      return
    }

    if (editingId) {
      const updatedProjects = projects.map((p) => (p.id === editingId ? { ...p, ...formData } : p))
      setProjects(updatedProjects)
      localStorage.setItem("projects", JSON.stringify(updatedProjects))
      setEditingId(null)
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        ...formData,
      }
      const updatedProjects = [...projects, newProject]
      setProjects(updatedProjects)
      localStorage.setItem("projects", JSON.stringify(updatedProjects))
    }

    setFormData({
      title: "",
      description: "",
      category: "Residential",
      image: "",
    })
    setImagePreview("")
  }

  const handleAddFloorPlan = (e: React.FormEvent) => {
    e.preventDefault()
    if (!floorPlanFormData.title || !floorPlanFormData.description || !floorPlanFormData.image) {
      alert("Please fill all fields and upload an image")
      return
    }

    if (editingId) {
      const updatedFloorPlans = floorPlans.map((fp) => (fp.id === editingId ? { ...fp, ...floorPlanFormData } : fp))
      setFloorPlans(updatedFloorPlans)
      localStorage.setItem("floorPlans", JSON.stringify(updatedFloorPlans))
      setEditingId(null)
    } else {
      const newFloorPlan: FloorPlan = {
        id: Date.now().toString(),
        ...floorPlanFormData,
      }
      const updatedFloorPlans = [...floorPlans, newFloorPlan]
      setFloorPlans(updatedFloorPlans)
      localStorage.setItem("floorPlans", JSON.stringify(updatedFloorPlans))
    }

    setFloorPlanFormData({
      title: "",
      description: "",
      area: "",
      bedrooms: "",
      image: "",
    })
    setImagePreview("")
  }

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = projects.filter((p) => p.id !== id)
      setProjects(updatedProjects)
      localStorage.setItem("projects", JSON.stringify(updatedProjects))
    }
  }

  const handleDeleteFloorPlan = (id: string) => {
    if (confirm("Are you sure you want to delete this floor plan?")) {
      const updatedFloorPlans = floorPlans.filter((fp) => fp.id !== id)
      setFloorPlans(updatedFloorPlans)
      localStorage.setItem("floorPlans", JSON.stringify(updatedFloorPlans))
    }
  }

  const handleEditProject = (project: Project) => {
    setEditingId(project.id)
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      image: project.image,
    })
    setImagePreview(project.image)
    setActiveTab("projects")
  }

  const handleEditFloorPlan = (floorPlan: FloorPlan) => {
    setEditingId(floorPlan.id)
    setFloorPlanFormData({
      title: floorPlan.title,
      description: floorPlan.description,
      area: floorPlan.area,
      bedrooms: floorPlan.bedrooms,
      image: floorPlan.image,
    })
    setImagePreview(floorPlan.image)
    setActiveTab("floorPlans")
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData({
      title: "",
      description: "",
      category: "Residential",
      image: "",
    })
    setFloorPlanFormData({
      title: "",
      description: "",
      area: "",
      bedrooms: "",
      image: "",
    })
    setImagePreview("")
  }

  return (
    <div className="min-h-screen bg-neutral-50 animate-fade-in">
      <header className="bg-black border-b border-[oklch(0.78_0.15_85)]/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[oklch(0.78_0.15_85)]">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">Manage projects and content</p>
          </div>
          <div className="flex gap-4">
            <Link href="/">
              <Button
                variant="outline"
                className="hover:scale-105 transition-transform duration-200 bg-transparent border-[oklch(0.78_0.15_85)] text-[oklch(0.78_0.15_85)] hover:bg-[oklch(0.68_0.15_85)]/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Site
              </Button>
            </Link>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="hover:scale-105 transition-transform duration-200"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => {
              setActiveTab("projects")
              handleCancelEdit()
            }}
            className={`flex-1 ${
              activeTab === "projects"
                ? "bg-[oklch(0.78_0.15_85)] text-black hover:bg-[oklch(0.68_0.15_85)]"
                : "bg-white text-black hover:bg-neutral-100"
            } transition-all duration-200`}
          >
            Manage Projects
          </Button>
          <Button
            onClick={() => {
              setActiveTab("floorPlans")
              handleCancelEdit()
            }}
            className={`flex-1 ${
              activeTab === "floorPlans"
                ? "bg-[oklch(0.78_0.15_85)] text-black hover:bg-[oklch(0.68_0.15_85)]"
                : "bg-white text-black hover:bg-neutral-100"
            } transition-all duration-200`}
          >
            Manage Floor Plans
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-20 animate-slide-in-left border border-neutral-200">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">
                {activeTab === "projects"
                  ? editingId
                    ? "Edit Project"
                    : "Add New Project"
                  : editingId
                    ? "Edit Floor Plan"
                    : "Add New Floor Plan"}
              </h2>

              {activeTab === "projects" ? (
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Project Title</label>
                    <Input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter project title"
                      className="transition-all duration-200 focus:scale-[1.01]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter project description"
                      rows={3}
                      className="transition-all duration-200 focus:scale-[1.01]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[oklch(0.78_0.15_85)] transition-all duration-200"
                    >
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Mixed-Use</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Project Image</label>
                    <Input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
                  </div>

                  {imagePreview && (
                    <div className="relative w-full h-40 bg-neutral-100 rounded-lg overflow-hidden animate-fade-in-scale">
                      <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-[oklch(0.78_0.15_85)] text-black hover:bg-[oklch(0.68_0.15_85)] hover:scale-[1.02] transition-all duration-200"
                    >
                      {editingId ? "Update" : "Add"} Project
                    </Button>
                    {editingId && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelEdit}
                        className="flex-1 bg-transparent hover:scale-[1.02] transition-all duration-200"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              ) : (
                <form onSubmit={handleAddFloorPlan} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Floor Plan Title</label>
                    <Input
                      type="text"
                      value={floorPlanFormData.title}
                      onChange={(e) => setFloorPlanFormData((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., 2 BHK Premium"
                      className="transition-all duration-200 focus:scale-[1.01]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
                    <Textarea
                      value={floorPlanFormData.description}
                      onChange={(e) => setFloorPlanFormData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter floor plan description"
                      rows={3}
                      className="transition-all duration-200 focus:scale-[1.01]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Area</label>
                    <Input
                      type="text"
                      value={floorPlanFormData.area}
                      onChange={(e) => setFloorPlanFormData((prev) => ({ ...prev, area: e.target.value }))}
                      placeholder="e.g., 1200 sq.ft"
                      className="transition-all duration-200 focus:scale-[1.01]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Bedrooms</label>
                    <Input
                      type="text"
                      value={floorPlanFormData.bedrooms}
                      onChange={(e) => setFloorPlanFormData((prev) => ({ ...prev, bedrooms: e.target.value }))}
                      placeholder="e.g., 2 BHK"
                      className="transition-all duration-200 focus:scale-[1.01]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Floor Plan Image</label>
                    <Input type="file" accept="image/*" onChange={handleFloorPlanImageUpload} className="w-full" />
                  </div>

                  {imagePreview && (
                    <div className="relative w-full h-40 bg-neutral-100 rounded-lg overflow-hidden animate-fade-in-scale">
                      <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-[oklch(0.78_0.15_85)] text-black hover:bg-[oklch(0.68_0.15_85)] hover:scale-[1.02] transition-all duration-200"
                    >
                      {editingId ? "Update" : "Add"} Floor Plan
                    </Button>
                    {editingId && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelEdit}
                        className="flex-1 bg-transparent hover:scale-[1.02] transition-all duration-200"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 animate-slide-in-right border border-neutral-200">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">
                {activeTab === "projects"
                  ? `Current Projects (${projects.length})`
                  : `Floor Plans (${floorPlans.length})`}
              </h2>

              {activeTab === "projects" ? (
                projects.length === 0 ? (
                  <p className="text-neutral-600 text-center py-8">No projects yet. Add one using the form.</p>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project, index) => (
                      <div
                        key={project.id}
                        className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 hover:shadow-md transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex gap-4">
                          <div className="relative w-24 h-24 bg-neutral-100 rounded-lg flex-shrink-0 overflow-hidden group">
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-bold text-neutral-900">{project.title}</h3>
                                <span className="text-xs bg-[oklch(0.78_0.15_85)]/20 text-[oklch(0.5_0.15_85)] px-2 py-1 rounded inline-block mt-1 border border-[oklch(0.78_0.15_85)]/30">
                                  {project.category}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-neutral-600 mb-3">{project.description}</p>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditProject(project)}
                                className="hover:scale-105 transition-transform duration-200"
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteProject(project.id)}
                                className="hover:scale-105 transition-transform duration-200"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : floorPlans.length === 0 ? (
                <p className="text-neutral-600 text-center py-8">No floor plans yet. Add one using the form.</p>
              ) : (
                <div className="space-y-4">
                  {floorPlans.map((floorPlan, index) => (
                    <div
                      key={floorPlan.id}
                      className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 hover:shadow-md transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 bg-neutral-100 rounded-lg flex-shrink-0 overflow-hidden group">
                          <Image
                            src={floorPlan.image || "/placeholder.svg"}
                            alt={floorPlan.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-neutral-900">{floorPlan.title}</h3>
                              <div className="flex gap-2 mt-1">
                                <span className="text-xs bg-[oklch(0.78_0.15_85)]/20 text-[oklch(0.5_0.15_85)] px-2 py-1 rounded border border-[oklch(0.78_0.15_85)]/30">
                                  {floorPlan.bedrooms}
                                </span>
                                <span className="text-xs bg-neutral-200 text-neutral-700 px-2 py-1 rounded">
                                  {floorPlan.area}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-neutral-600 mb-3">{floorPlan.description}</p>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditFloorPlan(floorPlan)}
                              className="hover:scale-105 transition-transform duration-200"
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteFloorPlan(floorPlan.id)}
                              className="hover:scale-105 transition-transform duration-200"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
