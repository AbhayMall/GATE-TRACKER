"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, ListTodo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Header() {
  const [daysLeft, setDaysLeft] = useState<number>(290)
  
  useEffect(() => {
    // GATE exam date - February 1, 2026
    const targetDate = new Date("2026-02-01")
    
    const calculateDaysLeft = () => {
      const now = new Date()
      const timeDiff = targetDate.getTime() - now.getTime()
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
      setDaysLeft(daysDiff > 0 ? daysDiff : 0)
    }
    
    calculateDaysLeft()
    const interval = setInterval(calculateDaysLeft, 86400000) // Update once per day
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between py-4">
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            GATE TRACKER
          </h1>
          <nav className="hidden md:flex gap-4">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/tasks" className="text-sm font-medium hover:text-primary transition-colors">
              Task History
            </Link>
          </nav>
        </motion.div>
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="flex items-center gap-2 p-2">
              <Clock className="h-4 w-4" />
              <span className="font-bold">{daysLeft} days</span>
              <span className="hidden sm:inline">left until GATE Exam</span>
            </CardContent>
          </Card>
          <Button variant="outline" size="icon" asChild className="md:hidden">
            <Link href="/tasks">
              <ListTodo className="h-4 w-4" />
              <span className="sr-only">Task History</span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </header>
  )
}