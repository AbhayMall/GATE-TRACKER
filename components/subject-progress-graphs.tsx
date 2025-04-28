"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { subjectData } from "@/data/subjects"
import { motion } from "framer-motion"

interface SubjectProgressGraphsProps {
  progress: Record<string, number>
}

export function SubjectProgressGraphs({ progress }: SubjectProgressGraphsProps) {
  const [animateGraph, setAnimateGraph] = useState(false)

  // Create data for the chart
  const chartData = Object.entries(progress)
    .filter(([subject]) => subject !== "overall")
    .map(([subject, value]) => ({
      subject: subjectData[subject]?.name || subject,
      progress: Math.round(value),
      color: getSubjectColor(subject),
    }))
    .sort((a, b) => b.progress - a.progress)

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateGraph(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid gap-4">
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle>Subject Progress</CardTitle>
          <CardDescription>Your progress across all GATE subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            className="h-[500px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fill: "#666", fontSize: 12 }}
                />
                <YAxis
                  dataKey="subject"
                  type="category"
                  width={180}
                  tick={{ fill: "#333", fontSize: 12 }}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Progress"]}
                  labelStyle={{ fontWeight: "bold", color: "#333" }}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "none",
                    padding: "8px 12px",
                  }}
                />
                <Bar
                  dataKey="progress"
                  animationDuration={1500}
                  animationBegin={0}
                  animationEasing="ease-out"
                  radius={[0, 4, 4, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={animateGraph ? 0.85 : 0.4} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </CardContent>
      </Card>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {Object.entries(progress)
          .filter(([subject]) => subject !== "overall")
          .map(([subject, value]) => (
            <SubjectCard
              key={subject}
              subject={subjectData[subject]?.name || subject}
              progress={Math.round(value)}
              color={getSubjectColor(subject)}
            />
          ))}
      </motion.div>
    </div>
  )
}

interface SubjectCardProps {
  subject: string
  progress: number
  color: string
}

function SubjectCard({ subject, progress, color }: SubjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="h-1.5" style={{ backgroundColor: color }}></div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-sm truncate">{subject}</h3>
          <span className="text-sm font-bold" style={{ color }}>
            {progress}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <motion.div
            className="h-2.5 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          ></motion.div>
        </div>
      </CardContent>
    </Card>
  )
}

// Function to get a color for each subject
function getSubjectColor(subject: string): string {
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
