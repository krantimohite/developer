"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

const ADMIN_PASSWORD = "admin123" // Simple password for demo

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_authenticated", "true")
      router.push("/admin/dashboard")
    } else {
      setError("Invalid password")
      setPassword("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-yellow-700 flex items-center justify-center px-4 animate-fade-in">
      <Link href="/" className="absolute top-6 left-6">
        <Button variant="ghost" className="text-yellow-400 hover:bg-yellow-400/10 transition-colors duration-200">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Site
        </Button>
      </Link>

      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md animate-slide-up">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2 text-center">Admin Login</h1>
        <p className="text-center text-neutral-600 mb-8">Shri Vishnu Waman Thakur Developers</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("")
              }}
              placeholder="Enter admin password"
              className="w-full transition-all duration-200 focus:scale-[1.02]"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded animate-shake">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-black font-semibold hover:scale-[1.02] transition-all duration-200"
          >
            Login
          </Button>
        </form>

        <p className="text-center text-neutral-600 text-sm mt-8">
          Demo password: <span className="font-mono bg-neutral-100 px-2 py-1 rounded">admin123</span>
        </p>
      </div>
    </div>
  )
}
