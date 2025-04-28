"use client"

import { useState, useEffect } from "react"
import { format, parseISO } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, CheckCircle } from "lucide-react"

interface Todo {
  id: string
  text: string
  completed: boolean
  date: string
}

type TodoMap = Record<string, Todo[]>

export function TaskHistory() {
  const [todos, setTodos] = useState<TodoMap>({})
  const [activeDays, setActiveDays] = useState<string[]>([])
  const [flattenedTodos, setFlattenedTodos] = useState<Todo[]>([])

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("gateTodos")
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos) as TodoMap
      setTodos(parsedTodos)

      // Flatten todos for easier filtering
      const allTodos: Todo[] = []
      Object.entries(parsedTodos).forEach(([date, todosForDate]) => {
        todosForDate.forEach((todo) => {
          allTodos.push({ ...todo, date })
        })
      })
      setFlattenedTodos(allTodos.sort((a, b) => b.date.localeCompare(a.date)))
    }

    const savedActiveDays = localStorage.getItem("gateActiveDays")
    if (savedActiveDays) {
      setActiveDays(JSON.parse(savedActiveDays))
    }
  }, [])

  const toggleTodo = (todoId: string, date: string) => {
    setTodos((prev) => {
      const updatedTodos = { ...prev }

      if (updatedTodos[date]) {
        updatedTodos[date] = updatedTodos[date].map((todo) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
        )
      }

      // Update flattened todos
      setFlattenedTodos(
        flattenedTodos.map((todo) => (todo.id === todoId ? { ...todo, completed: !todo.completed } : todo)),
      )

      // Save to localStorage
      localStorage.setItem("gateTodos", JSON.stringify(updatedTodos))

      return updatedTodos
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Activity Summary</CardTitle>
          <CardDescription>You've been active on {activeDays.length} days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {activeDays
              .sort((a, b) => b.localeCompare(a))
              .map((day) => (
                <div key={day} className="flex items-center gap-1 text-sm bg-primary/10 px-2 py-1 rounded-md">
                  <CalendarIcon className="h-3 w-3" />
                  <span>{format(parseISO(day), "MMM d, yyyy")}</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <TaskList
            title="All Tasks"
            description="All your tasks organized by date"
            todos={flattenedTodos}
            onToggle={toggleTodo}
          />
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <TaskList
            title="Completed Tasks"
            description="Tasks you've already completed"
            todos={flattenedTodos.filter((todo) => todo.completed)}
            onToggle={toggleTodo}
          />
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          <TaskList
            title="Pending Tasks"
            description="Tasks you still need to complete"
            todos={flattenedTodos.filter((todo) => !todo.completed)}
            onToggle={toggleTodo}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface TaskListProps {
  title: string
  description: string
  todos: Todo[]
  onToggle: (id: string, date: string) => void
}

function TaskList({ title, description, todos, onToggle }: TaskListProps) {
  // Group todos by date
  const todosByDate: Record<string, Todo[]> = {}
  todos.forEach((todo) => {
    if (!todosByDate[todo.date]) {
      todosByDate[todo.date] = []
    }
    todosByDate[todo.date].push(todo)
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {Object.keys(todosByDate).length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="mx-auto h-12 w-12 mb-2 opacity-20" />
            <p>No tasks found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(todosByDate)
              .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
              .map(([date, todosForDate]) => (
                <div key={date} className="space-y-2">
                  <h3 className="font-medium text-sm text-muted-foreground">
                    {format(parseISO(date), "EEEE, MMMM d, yyyy")}
                  </h3>
                  <ul className="space-y-2">
                    {todosForDate.map((todo) => (
                      <li key={todo.id} className="flex items-center gap-2 rounded-md border p-3">
                        <Checkbox checked={todo.completed} onCheckedChange={() => onToggle(todo.id, todo.date)} />
                        <span className={todo.completed ? "line-through text-muted-foreground" : ""}>{todo.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
