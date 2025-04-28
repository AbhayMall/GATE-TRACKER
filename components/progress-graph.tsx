"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { subjectData } from "@/data/subjects"

interface ProgressGraphProps {
  progress: Record<string, number>
}

export function ProgressGraph({ progress }: ProgressGraphProps) {
  const chartData = Object.entries(progress)
    .filter(([subject]) => subject !== "overall")
    .map(([subject, value]) => ({
      subject: subjectData[subject]?.name || subject,
      progress: Math.round(value),
    }))
    .sort((a, b) => b.progress - a.progress)

  const overallProgress = progress.overall || 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Syllabus Progress</CardTitle>
        <CardDescription>Overall completion: {Math.round(overallProgress)}%</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="subject" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => [`${value}%`, "Progress"]} labelStyle={{ fontWeight: "bold" }} />
              <Bar dataKey="progress" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
