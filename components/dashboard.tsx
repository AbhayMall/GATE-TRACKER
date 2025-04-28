"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { SyllabusTracker } from "@/components/syllabus-tracker"
import { Calendar } from "@/components/calendar"
import { SubjectProgressGraphs } from "@/components/subject-progress-graphs"
import { subjectData } from "@/data/subjects"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export function Dashboard() {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({})
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [activeDays, setActiveDays] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCompletedItems = localStorage.getItem("gateCompletedItems")
    if (savedCompletedItems) {
      setCompletedItems(JSON.parse(savedCompletedItems))
    }

    const savedActiveDays = localStorage.getItem("gateActiveDays")
    if (savedActiveDays) {
      setActiveDays(JSON.parse(savedActiveDays))
    }

    setIsLoading(false)
  }, [])

  // Calculate progress whenever completedItems changes
  useEffect(() => {
    if (isLoading) return

    const newProgress: Record<string, number> = {}
    let totalCompleted = 0
    let totalItems = 0

    Object.keys(subjectData).forEach((subject) => {
      const subjectItems = subjectData[subject].items
      const completedCount = subjectItems.filter((item) => completedItems[`${subject}-${item.id}`]).length

      newProgress[subject] = subjectItems.length > 0 ? (completedCount / subjectItems.length) * 100 : 0

      totalCompleted += completedCount
      totalItems += subjectItems.length
    })

    newProgress["overall"] = totalItems > 0 ? (totalCompleted / totalItems) * 100 : 0
    setProgress(newProgress)

    // Save to localStorage
    localStorage.setItem("gateCompletedItems", JSON.stringify(completedItems))
  }, [completedItems, isLoading])

  const toggleCompletion = (subject: string, itemId: string) => {
    const key = `${subject}-${itemId}`
    setCompletedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))

    // Record activity for today
    const today = new Date().toISOString().split("T")[0]
    if (!activeDays.includes(today)) {
      const newActiveDays = [...activeDays, today]
      setActiveDays(newActiveDays)
      localStorage.setItem("gateActiveDays", JSON.stringify(newActiveDays))
    }
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="container py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading your progress...</p>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="container py-6">
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:col-span-2">
            <Card className="mb-6 overflow-hidden border-0 shadow-md">
              <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <CardHeader className="pb-2">
                <CardTitle>Overall Progress</CardTitle>
                <CardDescription>Your GATE syllabus completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{Math.round(progress.overall || 0)}% complete</span>
                  <span className="text-sm text-muted-foreground">
                    {Object.values(completedItems).filter(Boolean).length} of{" "}
                    {Object.values(subjectData).reduce((acc, subject) => acc + subject.items.length, 0)} topics
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 mt-2">
                  <motion.div
                    className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress.overall || 0}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="progress" className="space-y-4">
              <TabsList className="bg-white/50 backdrop-blur-sm">
                <TabsTrigger value="progress">Subject Progress</TabsTrigger>
                <TabsTrigger value="syllabus">Syllabus Tracker</TabsTrigger>
              </TabsList>
              <TabsContent value="progress" className="space-y-4">
                <SubjectProgressGraphs progress={progress} />
              </TabsContent>
              <TabsContent value="syllabus" className="space-y-4">
                <SyllabusTracker
                  subjects={subjectData}
                  completedItems={completedItems}
                  onToggleCompletion={toggleCompletion}
                />
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Calendar
              onTaskAdded={() => {
                // Record activity for today
                const today = new Date().toISOString().split("T")[0]
                if (!activeDays.includes(today)) {
                  const newActiveDays = [...activeDays, today]
                  setActiveDays(newActiveDays)
                  localStorage.setItem("gateActiveDays", JSON.stringify(newActiveDays))
                }
              }}
            />
          </div>
        </motion.div>
      </main>
    </>
  )
}
