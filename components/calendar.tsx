"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isToday } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Plus, X, CalendarIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Todo {
  id: string
  text: string
  completed: boolean
  date: string
}

type TodoMap = Record<string, Todo[]>

interface CalendarProps {
  onTaskAdded?: () => void
}

export function Calendar({ onTaskAdded }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [todos, setTodos] = useState<TodoMap>({})
  const [newTodo, setNewTodo] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("gateTodos")
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }

    // Set selected date to today initially
    setSelectedDate(new Date())
    setIsLoading(false)
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("gateTodos", JSON.stringify(todos))
    }
  }, [todos, isLoading])

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const selectedDateStr = format(selectedDate, "yyyy-MM-dd")

  const addTodo = () => {
    if (newTodo.trim() === "") return

    setTodos((prev) => {
      const updatedTodos = { ...prev }
      const dateKey = format(selectedDate, "yyyy-MM-dd")

      if (!updatedTodos[dateKey]) {
        updatedTodos[dateKey] = []
      }

      updatedTodos[dateKey].push({
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
        date: dateKey,
      })

      return updatedTodos
    })

    setNewTodo("")
    if (onTaskAdded) onTaskAdded()
  }

  const toggleTodo = (todoId: string) => {
    setTodos((prev) => {
      const updatedTodos = { ...prev }
      const dateKey = format(selectedDate, "yyyy-MM-dd")

      if (updatedTodos[dateKey]) {
        updatedTodos[dateKey] = updatedTodos[dateKey].map((todo) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
        )
      }

      return updatedTodos
    })
  }

  const removeTodo = (todoId: string) => {
    setTodos((prev) => {
      const updatedTodos = { ...prev }
      const dateKey = format(selectedDate, "yyyy-MM-dd")

      if (updatedTodos[dateKey]) {
        updatedTodos[dateKey] = updatedTodos[dateKey].filter((todo) => todo.id !== todoId)
      }

      return updatedTodos
    })
  }

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full border-0 shadow-md overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-primary" />
            {format(currentDate, "MMMM yyyy")}
          </CardTitle>
          <Button variant="outline" size="icon" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: new Date(monthStart).getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8" />
          ))}

          {monthDays.map((day) => {
            const dateStr = format(day, "yyyy-MM-dd")
            const isCurrentDay = isToday(day)
            const isSelected = isSameDay(day, selectedDate)
            const hasTodos = todos[dateStr] && todos[dateStr].length > 0

            return (
              <Button
                key={day.toString()}
                variant={isSelected ? "default" : "outline"}
                className={`h-8 w-8 p-0 relative ${isCurrentDay ? "border-primary border-2" : ""} ${hasTodos ? "font-bold" : ""}`}
              >
                {format(day, "d")}
                {hasTodos && <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-primary rounded-full"></span>}
              </Button>
            )
          })}
        </div>

        <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <span className="text-primary">{format(selectedDate, "MMMM d, yyyy")}</span>
            {isToday(selectedDate) && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Today</span>
            )}
          </h3>

          <div className="space-y-2">
            <div className="flex space-x-2">
              <Input
                placeholder="Add a task for this day..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addTodo()
                }}
                className="border-primary/20 focus-visible:ring-primary/30"
              />
              <Button size="icon" onClick={addTodo} className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <AnimatePresence>
              {todos[selectedDateStr]?.length > 0 ? (
                <motion.ul
                  className="space-y-2 mt-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {todos[selectedDateStr].map((todo) => (
                    <motion.li
                      key={todo.id}
                      className="flex items-center justify-between gap-2 rounded-md border p-2 bg-white/50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={() => toggleTodo(todo.id)}
                          className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <span className={todo.completed ? "line-through text-muted-foreground" : ""}>{todo.text}</span>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeTodo(todo.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <motion.div
                  className="text-center py-6 text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm">No tasks for this day</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
