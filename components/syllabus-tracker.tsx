"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { SubjectData } from "@/data/subjects"

interface SyllabusTrackerProps {
  subjects: Record<string, SubjectData>
  completedItems: Record<string, boolean>
  onToggleCompletion: (subject: string, itemId: string) => void
}

export function SyllabusTracker({ subjects, completedItems, onToggleCompletion }: SyllabusTrackerProps) {
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([])

  const toggleSubject = (subject: string) => {
    setExpandedSubjects((prev) => (prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]))
  }

  const calculateProgress = (subject: string) => {
    const items = subjects[subject].items
    if (items.length === 0) return 0

    const completed = items.filter((item) => completedItems[`${subject}-${item.id}`]).length

    return (completed / items.length) * 100
  }

  // Get color for subject
  const getSubjectColor = (subject: string): string => {
    const colors = {
      coa: "#4C51BF", // Indigo
      dbms: "#2B6CB0", // Blue
      os: "#2C7A7B", // Teal
      toc: "#2F855A", // Green
      cd: "#9C4221", // Orange
      dl: "#744210", // Yellow
      pds: "#702459", // Pink
      ra: "#5A67D8", // Purple
      em: "#E53E3E", // Red
      cn: "#6B46C1", // Purple
      dm: "#DD6B20", // Orange
      algo: "#805AD5", // Purple
      default: "#3182CE", // Blue
    }

    return colors[subject as keyof typeof colors] || colors.default
  }

  return (
    <div className="space-y-4">
      {Object.entries(subjects).map(([subjectKey, subject]) => {
        const subjectProgress = calculateProgress(subjectKey)
        const subjectColor = getSubjectColor(subjectKey)

        return (
          <Card key={subjectKey} className="overflow-hidden shadow-sm border-0">
            <div className="h-1" style={{ backgroundColor: subjectColor }}></div>
            <CardHeader className="py-3 px-4">
              <div className="flex items-center justify-between">
                <CardTitle
                  className="text-base font-medium cursor-pointer flex items-center gap-2"
                  onClick={() => toggleSubject(subjectKey)}
                >
                  {expandedSubjects.includes(subjectKey) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                  {subject.name}
                </CardTitle>
                <span className="text-sm font-semibold" style={{ color: subjectColor }}>
                  {Math.round(subjectProgress)}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: subjectColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${subjectProgress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                ></motion.div>
              </div>
            </CardHeader>

            <AnimatePresence>
              {expandedSubjects.includes(subjectKey) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {subject.items.map((item) => {
                        const isCompleted = !!completedItems[`${subjectKey}-${item.id}`]

                        return (
                          <motion.li
                            key={item.id}
                            className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Checkbox
                              id={`${subjectKey}-${item.id}`}
                              checked={isCompleted}
                              onCheckedChange={() => onToggleCompletion(subjectKey, item.id)}
                              className="border-2"
                              style={{
                                borderColor: isCompleted ? subjectColor : undefined,
                                backgroundColor: isCompleted ? subjectColor : undefined,
                              }}
                            />
                            <label
                              htmlFor={`${subjectKey}-${item.id}`}
                              className={`text-sm cursor-pointer ${isCompleted ? "line-through text-muted-foreground" : ""}`}
                            >
                              {item.name}
                            </label>
                          </motion.li>
                        )
                      })}
                    </ul>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        )
      })}
    </div>
  )
}
