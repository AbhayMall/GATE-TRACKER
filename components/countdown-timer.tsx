"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"

export default function CountdownTimer() {
  const [daysLeft, setDaysLeft] = useState<number>(0)
  const [hoursLeft, setHoursLeft] = useState<number>(0)
  
  // Set target date to February 1, 2026
  const targetDate = "2026-02-01T00:00:00"
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const target = new Date(targetDate)
      const timeDiff = target.getTime() - now.getTime()
      
      // Calculate days and hours
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24))
      const hoursDiff = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600))
      
      setDaysLeft(daysDiff > 0 ? daysDiff : 0)
      setHoursLeft(hoursDiff > 0 ? hoursDiff : 0)
    }
    
    calculateTimeLeft()
    // Update every hour instead of every day for more accuracy
    const interval = setInterval(calculateTimeLeft, 3600000)
    
    return () => clearInterval(interval)
  }, [targetDate])
  
  return (
    <Card className="bg-primary text-primary-foreground">
      <CardContent className="flex items-center gap-2 p-4">
        <Clock className="h-5 w-5" />
        <span className="font-bold">{daysLeft} days, {hoursLeft} hours</span>
        <span>left until GATE Exam (Feb 1, 2026)</span>
      </CardContent>
    </Card>
  )
}